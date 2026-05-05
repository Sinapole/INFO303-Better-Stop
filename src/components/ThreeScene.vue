<template>
  <div ref="canvasHost" class="three-viewer" :aria-label="labels.dragHint">
    <div
      v-if="loading || loadFailed"
      class="viewer-status"
      :class="{ 'viewer-status--error': loadFailed }"
    >
      {{ loadFailed ? labels.loadError : labels.loading }}
    </div>

    <div class="viewer-toolbar">
      <span>{{ labels.dragHint }}</span>
      <button type="button" @click="resetCamera">
        {{ labels.resetView }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isHotspotName, type HotspotId } from '../data/hotspots';
import { SCENARIO_TEXTURES, type ScenarioId } from '../data/scenarios';
import { SCREEN_ANIMATIONS, type ScreenAnimationConfig } from '../data/screenAnimations';
import type { ViewerText } from '../i18n/types';

/** ThreeScene 的输入状态；文本和交互状态由 App 维护，模型只加载一次。 */
interface ThreeSceneProps {
  /** 当前语言下的 viewer 短文案。切换语言不会触发模型重载。 */
  labels: ViewerText;
  /** 当前服务情境，用于尝试替换 e-paper / kiosk 贴图。 */
  scenarioId: ScenarioId;
  /** App 中点击固定的 hotspot；ThreeScene 用它保持选中高亮。 */
  selectedHotspotId: HotspotId | null;
}

const props = defineProps<ThreeSceneProps>();

const emit = defineEmits<{
  /** hover 状态变化时通知 App 更新右侧短说明。 */
  'hotspot-hover': [hotspotId: HotspotId | null];
  /** click hotspot 时通知 App 固定右侧详细说明。 */
  'hotspot-select': [hotspotId: HotspotId];
}>();

const canvasHost = ref<HTMLElement | null>(null);
const loading = ref(true);
const loadFailed = ref(false);

/** GLB 模型路径。如果以后换模型文件，优先改这里。 */
const modelPath = buildPublicAssetPath('models', 'better-stop.glb');
/** hover outline 使用交通警示橙色；selected outline 使用导视青色。 */
const hoverOutlineColor = new THREE.Color('#ff9f1c');
const selectedOutlineColor = new THREE.Color('#007f7a');

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let resizeObserver: ResizeObserver | null = null;
let animationId = 0;
let scenarioRequestId = 0;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
/** 所有可被 raycast 命中的 hotspot mesh。 */
const clickableMeshes: THREE.Mesh[] = [];
/** hotspot ID 到其子 mesh 的映射，用于整组高亮。 */
const hotspotMeshes = new Map<HotspotId, THREE.Mesh[]>();
/** 原始材质快照，用于切换 scenario 后恢复 display 贴图。 */
const materialSnapshots = new Map<string, MaterialSnapshot>();
/** 根据对象名猜测出的可替换贴图对象。 */
const displayTargets: DisplayTarget[] = [];
/** 当前正在播放的屏幕假帧动画。 */
const activeScreenAnimations: ScreenAnimationState[] = [];
let hoveredHotspotId: HotspotId | null = null;
let hoverOutlineHotspotId: HotspotId | null = null;
let selectedOutlineHotspotId: HotspotId | null = null;
let hoverOutline: THREE.Box3Helper | null = null;
let selectedOutline: THREE.Box3Helper | null = null;
let initialCameraState: CameraState | null = null;

/** 保存初始相机视角，供 Reset view 按钮恢复。 */
interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/**
 * 材质原始状态快照。
 *
 * Three.js 材质类型很多，并不是每种材质都有 map。这里仅保存 scenario
 * 贴图切换需要恢复的原始 map。
 */
interface MaterialSnapshot {
  map?: THREE.Texture | null;
}

/**
 * 可被假帧贴图替换的屏幕 mesh。
 *
 * role 只允许 e-paper 和 kiosk 两类。不要把所有名字含有 Display/Screen
 * 的 mesh 都当作可替换目标，因为 PrintPanel 等静态信息板也可能挂在
 * Digital Screen 父级下面。
 */
interface DisplayTarget {
  mesh: THREE.Mesh;
  role: 'epaper' | 'kiosk';
  label: string;
}

/** 运行中的屏幕假帧动画状态。 */
interface ScreenAnimationState {
  target: DisplayTarget;
  textures: THREE.Texture[];
  refreshTexture: THREE.Texture | null;
  timerId: ReturnType<typeof window.setInterval> | null;
  refreshTimerId: ReturnType<typeof window.setTimeout> | null;
}

/** mesh 当前 UV 坐标的二维范围。 */
interface UvBounds {
  minU: number;
  minV: number;
  maxU: number;
  maxV: number;
}

onMounted(() => {
  setupScene();
  loadModel();
  watchContainerSize();
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  resizeObserver?.disconnect();
  renderer?.domElement.removeEventListener('pointermove', handlePointerMove);
  renderer?.domElement.removeEventListener('pointerleave', handlePointerLeave);
  renderer?.domElement.removeEventListener('click', handleClick);
  stopScreenAnimations();
  removeOutlineHelper(hoverOutline);
  removeOutlineHelper(selectedOutline);
  controls?.dispose();
  renderer?.dispose();
});

watch(
  () => props.scenarioId,
  () => {
    void refreshDisplayTextures();
  },
);

watch(
  () => props.selectedHotspotId,
  () => {
    refreshHighlight();
  },
);

/**
 * 生成 public 目录资源的部署安全 URL。
 *
 * Vite 在 GitHub Pages 子路径部署时需要尊重 `base`；用这个 helper 可以避免
 * 直接写 `/models/...` 在子路径部署时失效。
 *
 * @param folder public 下的一级目录，例如 models 或 textures。
 * @param filename 文件名。
 * @returns 浏览器可加载的绝对 URL。
 */
function buildPublicAssetPath(folder: string, filename: string): string {
  return new URL(`${import.meta.env.BASE_URL}${folder}/${filename}`, window.location.href).href;
}

/**
 * 初始化 Three.js 场景、相机、renderer、灯光和 OrbitControls。
 *
 * 这个函数只在组件 mount 时运行一次；之后切换语言或 scenario 不会重新创建场景。
 */
function setupScene(): void {
  if (!canvasHost.value) {
    return;
  }

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#f4f6f8');

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(6, 4, 7);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.className = 'three-viewer__canvas';
  canvasHost.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.5;
  controls.maxDistance = 40;

  const hemisphere = new THREE.HemisphereLight('#ffffff', '#8290a0', 1.8);
  const keyLight = new THREE.DirectionalLight('#ffffff', 2.3);
  keyLight.position.set(5, 8, 6);
  const fillLight = new THREE.DirectionalLight('#d9f5f2', 0.8);
  fillLight.position.set(-5, 3, -4);

  scene.add(hemisphere, keyLight, fillLight);

  renderer.domElement.addEventListener('pointermove', handlePointerMove);
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
  renderer.domElement.addEventListener('click', handleClick);

  resizeRenderer();
}

/**
 * 使用 GLTFLoader 加载 bus stop GLB。
 *
 * 加载成功后会扫描 scene graph：先复制材质和保存快照，再注册 Hotspot_ 对象，
 * 最后查找可能可以替换贴图的 display/screen/kiosk mesh。
 */
function loadModel(): void {
  if (!scene) {
    return;
  }

  const loader = new GLTFLoader();

  // 如果 GLB 从 public/models/better-stop.glb 移走，请修改上方 modelPath。
  loader.load(
    modelPath,
    (gltf: GLTF) => {
      const model = gltf.scene;
      scene?.add(model);
      prepareModel(model);
      frameModel(model);
      loading.value = false;
      void refreshDisplayTextures();
    },
    undefined,
    (error: unknown) => {
      console.error('[Better Stop] Failed to load GLB model:', error);
      loading.value = false;
      loadFailed.value = true;
    },
  );
}

/**
 * 准备刚加载的模型，使它可以被 hover、click 和替换贴图。
 *
 * @param model GLTFLoader 返回的根场景节点。
 */
function prepareModel(model: THREE.Object3D): void {
  model.traverse((object) => {
    if (isMesh(object)) {
      cloneMaterialsForInteraction(object);
      captureMaterialSnapshots(object);
    }
  });

  model.traverse((object) => {
    if (isHotspotName(object.name)) {
      registerHotspot(object, object.name);
    }
  });

  collectDisplayTargets(model);
}

/**
 * 把一个 `Hotspot_` 对象及其所有子 mesh 注册为同一个交互区域。
 *
 * 模型师可以把 hotspot 放在 group 或 mesh 上；这里会 traverse 它的子层级，
 * 所以两种建模方式都能工作。
 *
 * @param root 名称以 Hotspot_ 开头的 Object3D。
 * @param hotspotId 该对象在 GLB 中的名称。
 */
function registerHotspot(root: THREE.Object3D, hotspotId: HotspotId): void {
  const meshes = hotspotMeshes.get(hotspotId) ?? [];

  root.traverse((object) => {
    if (!isMesh(object)) {
      return;
    }

    object.userData.hotspotId = hotspotId;

    if (!clickableMeshes.includes(object)) {
      clickableMeshes.push(object);
    }

    if (!meshes.includes(object)) {
      meshes.push(object);
    }
  });

  hotspotMeshes.set(hotspotId, meshes);
}

/**
 * 根据 mesh 自身和父级对象名，收集可能的动态贴图目标。
 *
 * 这个函数是 graceful fallback 的关键：如果模型暂时没有命名好的 display mesh，
 * 页面仍然能运行，只在 console 中给出 warning。
 *
 * @param model GLB 根节点。
 */
function collectDisplayTargets(model: THREE.Object3D): void {
  displayTargets.length = 0;

  model.traverse((object) => {
    if (!isMesh(object)) {
      return;
    }

    const ancestry = getObjectAncestryLabel(object);
    const role = classifyDisplayTarget(ancestry);

    if (role) {
      displayTargets.push({
        mesh: object,
        role,
        label: ancestry,
      });
    }
  });

  if (displayTargets.length === 0) {
    console.warn(`[Better Stop] ${props.labels.textureTargetWarning}`);
  }
}

/**
 * 通过对象名称判断 display target 类型。
 *
 * 这里故意只认明确的 hotspot 名称，不再因为父级包含 Digital Screen 就替换。
 * 当前模型里 PrintPanel 也在 Digital Screen 父级下，如果继续用 screen/display
 * 这种泛匹配，会把静态印刷面板误换成 e-paper 假帧。
 *
 * @param label mesh 与其父级名称拼接后的字符串。
 * @returns display role；如果不是可替换贴图对象则返回 null。
 */
function classifyDisplayTarget(label: string): DisplayTarget['role'] | null {
  const normalized = label.toLowerCase();
  const isEpaperHotspot =
    normalized.includes('hotspot_stopsign_withepaper') ||
    normalized.includes('hotspot_epaperdisplay');
  const isKioskHotspot = normalized.includes('hotspot_betterkiosk');

  if (isKioskHotspot) {
    return 'kiosk';
  }

  if (isEpaperHotspot) {
    return 'epaper';
  }

  return null;
}

/**
 * 根据当前 scenario 尝试替换所有 display target 的贴图。
 *
 * 贴图文件缺失、目标 mesh 缺失、或用户快速切换 scenario 都不会破坏 UI：
 * 缺失时 warning 后继续，过期请求通过 requestId 丢弃。
 */
async function applyScenarioTextures(): Promise<void> {
  if (displayTargets.length === 0) {
    return;
  }

  const textureSet = SCENARIO_TEXTURES[props.scenarioId];
  const requestId = ++scenarioRequestId;
  resetDisplayTargetMaps();

  const [epaperTexture, kioskTexture] = await Promise.all([
    loadOptionalTexture(textureSet.epaper),
    loadOptionalTexture(textureSet.kiosk),
  ]);

  if (requestId !== scenarioRequestId) {
    return;
  }

  for (const target of displayTargets) {
    const texture = target.role === 'kiosk' ? kioskTexture : epaperTexture;

    if (!texture) {
      continue;
    }

    applyTextureToTarget(target, texture);
  }
}

/**
 * 刷新屏幕贴图并重新启动假帧动画。
 *
 * scenario 贴图先作为基础帧写入模型；随后，如果某个 display target 命中了
 * `SCREEN_ANIMATIONS`，就由假帧动画接管该 mesh 的 map。
 */
async function refreshDisplayTextures(): Promise<void> {
  stopScreenAnimations();
  await applyScenarioTextures();
  await startScreenAnimations();
}

/**
 * 加载可选贴图资源。
 *
 * @param filename `public/textures/` 下的文件名。
 * @returns 成功时返回 THREE.Texture；加载失败时返回 null。
 */
function loadOptionalTexture(filename: string): Promise<THREE.Texture | null> {
  const texturePath = buildPublicAssetPath('textures', filename);
  const loader = new THREE.TextureLoader();

  return new Promise((resolve) => {
    loader.load(
      texturePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.anisotropy = renderer?.capabilities.getMaxAnisotropy() ?? 1;
        resolve(texture);
      },
      undefined,
      (error: unknown) => {
        console.warn(`[Better Stop] ${props.labels.textureMissingWarning} ${texturePath}`, error);
        resolve(null);
      },
    );
  });
}

/**
 * 把贴图应用到单个屏幕目标。
 *
 * 模型屏幕常常复用 atlas UV，不一定占满 0-1。这里先根据目标 mesh
 * 的现有 UV 范围调整 texture transform，让整张假帧覆盖这个屏幕面。
 *
 * @param target display target mesh 和识别出的屏幕角色。
 * @param texture 已加载的 scenario 贴图。
 */
function applyTextureToTarget(target: DisplayTarget, texture: THREE.Texture): void {
  normalizeTextureToTargetUv(texture, target.mesh);
  applyTextureToMesh(target.mesh, texture);
}

/**
 * 把贴图应用到单个 mesh 的所有可贴图材质。
 *
 * @param mesh display target mesh。
 * @param texture 已经按目标 UV 校正过的贴图。
 */
function applyTextureToMesh(mesh: THREE.Mesh, texture: THREE.Texture): void {
  for (const material of getMeshMaterials(mesh)) {
    if (!hasMap(material)) {
      continue;
    }

    material.map = texture;
    material.needsUpdate = true;
  }
}

/**
 * 按 mesh 当前 UV 范围校正 texture transform。
 *
 * 这一步不改 geometry，也不重建 UV，只把贴图采样从 `[min,max]` 映射到
 * 整张图片。这样可以复用模型已有 UV，同时避免 atlas UV 导致新 frame 只显示一角。
 *
 * @param texture 要应用到屏幕的贴图。
 * @param mesh 目标屏幕 mesh。
 */
function normalizeTextureToTargetUv(texture: THREE.Texture, mesh: THREE.Mesh): void {
  const bounds = getMeshUvBounds(mesh);

  if (!bounds) {
    return;
  }

  const repeatU = bounds.maxU - bounds.minU;
  const repeatV = bounds.maxV - bounds.minV;

  if (repeatU <= 0 || repeatV <= 0) {
    return;
  }

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1 / repeatU, 1 / repeatV);
  texture.offset.set(-bounds.minU / repeatU, -bounds.minV / repeatV);
  texture.needsUpdate = true;
}

/**
 * 读取 mesh 的 UV 包围范围。
 *
 * @param mesh 目标屏幕 mesh。
 * @returns UV 的 min/max；没有 UV 时返回 null。
 */
function getMeshUvBounds(mesh: THREE.Mesh): UvBounds | null {
  const uvAttribute = mesh.geometry.getAttribute('uv');

  if (!uvAttribute) {
    return null;
  }

  const bounds: UvBounds = {
    minU: Number.POSITIVE_INFINITY,
    minV: Number.POSITIVE_INFINITY,
    maxU: Number.NEGATIVE_INFINITY,
    maxV: Number.NEGATIVE_INFINITY,
  };

  for (let index = 0; index < uvAttribute.count; index += 1) {
    const u = uvAttribute.getX(index);
    const v = uvAttribute.getY(index);

    bounds.minU = Math.min(bounds.minU, u);
    bounds.minV = Math.min(bounds.minV, v);
    bounds.maxU = Math.max(bounds.maxU, u);
    bounds.maxV = Math.max(bounds.maxV, v);
  }

  return Number.isFinite(bounds.minU) ? bounds : null;
}

/**
 * 启动所有配置好的屏幕假帧动画。
 *
 * 这里不直接假设模型里一定存在某个屏幕；而是根据 display target 的 role
 * 和对象名关键词匹配，避免换模型后因为缺少某个 mesh 让整个 prototype 崩溃。
 */
async function startScreenAnimations(): Promise<void> {
  for (const target of displayTargets) {
    const config = getScreenAnimationConfig(target);

    if (!config) {
      continue;
    }

    const { textures, refreshTexture } = await loadAnimationTextures(config);

    if (textures.length === 0) {
      refreshTexture?.dispose();
      continue;
    }

    applyTextureToTarget(target, textures[0]);

    activeScreenAnimations.push({
      target,
      textures,
      refreshTexture,
      timerId: createFrameTimer(target, textures, refreshTexture, config),
      refreshTimerId: null,
    });
  }
}

/**
 * 停止所有屏幕假帧动画并释放对应贴图。
 *
 * 这个函数会在 scenario 刷新和组件卸载时调用，避免旧 interval 继续改已经
 * 不存在或即将被重置的材质。
 */
function stopScreenAnimations(): void {
  for (const animation of activeScreenAnimations) {
    if (animation.timerId) {
      window.clearInterval(animation.timerId);
    }

    if (animation.refreshTimerId) {
      window.clearTimeout(animation.refreshTimerId);
    }

    for (const texture of animation.textures) {
      texture.dispose();
    }

    animation.refreshTexture?.dispose();
  }

  activeScreenAnimations.length = 0;
}

/**
 * 为某个 display target 找到对应的假帧配置。
 *
 * @param target 从模型中识别出的屏幕 mesh。
 * @returns 命中的动画配置；没有命中时返回 undefined。
 */
function getScreenAnimationConfig(target: DisplayTarget): ScreenAnimationConfig | undefined {
  const normalizedLabel = target.label.toLowerCase();

  return SCREEN_ANIMATIONS.find(
    (config) =>
      config.role === target.role &&
      config.labelIncludes.every((keyword) => normalizedLabel.includes(keyword)),
  );
}

/**
 * 加载某个配置下的普通内容帧和可选刷新帧。
 *
 * @param config 屏幕动画配置。
 * @returns 成功加载的内容帧和刷新帧；缺失帧会被跳过。
 */
async function loadAnimationTextures(config: ScreenAnimationConfig): Promise<{
  textures: THREE.Texture[];
  refreshTexture: THREE.Texture | null;
}> {
  const [textures, refreshTexture] = await Promise.all([
    Promise.all(config.frames.map((frame) => loadOptionalTexture(frame))),
    config.refreshFrame ? loadOptionalTexture(config.refreshFrame) : Promise.resolve(null),
  ]);
  const loadedTextures = textures.filter((texture): texture is THREE.Texture => Boolean(texture));

  if (loadedTextures.length === 0) {
    console.warn(`[Better Stop] No screen animation frames loaded for ${config.id}.`);
  }

  return {
    textures: loadedTextures,
    refreshTexture,
  };
}

/**
 * 创建一个定时器，让目标屏幕按固定间隔切换到下一帧。
 *
 * 如果配置了 refresh frame，定时器会先播放刷新帧，再在 `refreshDurationMs`
 * 后切到下一张内容帧。这样 e-paper 看起来像先刷新再更新，而不是把刷新帧
 * 当作普通 carousel 内容。
 *
 * @param target 需要播放假帧的屏幕 mesh。
 * @param textures 已加载的内容帧贴图。
 * @param refreshTexture 可选刷新帧贴图。
 * @param config 屏幕动画配置。
 * @returns interval ID；只有一帧时返回 null。
 */
function createFrameTimer(
  target: DisplayTarget,
  textures: THREE.Texture[],
  refreshTexture: THREE.Texture | null,
  config: ScreenAnimationConfig,
): ReturnType<typeof window.setInterval> | null {
  if (textures.length <= 1) {
    return null;
  }

  let frameIndex = 0;

  return window.setInterval(() => {
    frameIndex = (frameIndex + 1) % textures.length;

    if (refreshTexture) {
      applyTextureToTarget(target, refreshTexture);
      const animationState = activeScreenAnimations.find(
        (animation) => animation.target === target,
      );

      if (animationState?.refreshTimerId) {
        window.clearTimeout(animationState.refreshTimerId);
      }

      const refreshDurationMs = config.refreshDurationMs ?? 650;
      const refreshTimerId = window.setTimeout(() => {
        applyTextureToTarget(target, textures[frameIndex]);

        if (animationState) {
          animationState.refreshTimerId = null;
        }
      }, refreshDurationMs);

      if (animationState) {
        animationState.refreshTimerId = refreshTimerId;
      }

      return;
    }

    applyTextureToTarget(target, textures[frameIndex]);
  }, config.intervalMs);
}

/**
 * 在切换 scenario 前，把 display target 的 map 恢复为模型原始贴图。
 *
 * 这样当某个 scenario 贴图缺失时，屏幕不会残留上一个 scenario 的贴图。
 */
function resetDisplayTargetMaps(): void {
  for (const target of displayTargets) {
    for (const material of getMeshMaterials(target.mesh)) {
      const snapshot = materialSnapshots.get(material.uuid);

      if (snapshot && hasMap(material)) {
        material.map = snapshot.map ?? null;
        material.needsUpdate = true;
      }
    }
  }
}

/**
 * 根据模型包围盒自动设置相机位置和 OrbitControls target。
 *
 * @param model 已经加入 scene 的 GLB 根节点。
 */
function frameModel(model: THREE.Object3D): void {
  if (!camera || !controls) {
    return;
  }

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z, 1);

  model.position.sub(center);

  const distance = maxDimension * 1.45;
  camera.position.set(-distance * 0.8, distance * 0.3, -distance);
  camera.near = Math.max(distance / 100, 0.01);
  camera.far = distance * 90;
  camera.updateProjectionMatrix();

  controls.target.set(0, Math.max(size.y * 0.08, 0), 0);
  controls.minDistance = Math.max(maxDimension * 0.25, 0.8);
  controls.maxDistance = maxDimension * 5;
  controls.update();

  initialCameraState = {
    position: camera.position.clone(),
    target: controls.target.clone(),
  };
}

/** 恢复初始相机视角。 */
function resetCamera(): void {
  if (!camera || !controls || !initialCameraState) {
    return;
  }

  camera.position.copy(initialCameraState.position);
  controls.target.copy(initialCameraState.target);
  controls.update();
}

/** 监听 viewer 容器尺寸变化，让 canvas 适配展示区域。 */
function watchContainerSize(): void {
  if (!canvasHost.value) {
    return;
  }

  resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(canvasHost.value);
}

/** 根据容器尺寸更新 renderer 尺寸和 camera aspect。 */
function resizeRenderer(): void {
  if (!canvasHost.value || !renderer || !camera) {
    return;
  }

  const width = canvasHost.value.clientWidth;
  const height = canvasHost.value.clientHeight;

  if (width <= 0 || height <= 0) {
    return;
  }

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

/** 渲染循环：更新 OrbitControls damping 并绘制当前 scene。 */
function animate(): void {
  animationId = requestAnimationFrame(animate);
  controls?.update();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

/**
 * pointer move 时执行 raycast，识别当前 hover 的 hotspot。
 *
 * @param event 浏览器 pointer 事件。
 */
function handlePointerMove(event: PointerEvent): void {
  const hotspotId = getIntersectedHotspot(event);
  setHoveredHotspot(hotspotId);
}

/** pointer 离开 canvas 后清除 hover 状态。 */
function handlePointerLeave(): void {
  setHoveredHotspot(null);
}

/**
 * click 时固定当前命中的 hotspot。
 *
 * @param event 浏览器 mouse 事件。
 */
function handleClick(event: MouseEvent): void {
  const hotspotId = getIntersectedHotspot(event);

  if (hotspotId) {
    emit('hotspot-select', hotspotId);
  }
}

/**
 * 将屏幕坐标转换为 Three.js NDC 坐标，并 raycast 所有 hotspot mesh。
 *
 * @param event mouse 或 pointer 事件。
 * @returns 命中的 hotspot ID；没有命中则返回 null。
 */
function getIntersectedHotspot(event: MouseEvent | PointerEvent): HotspotId | null {
  if (!renderer || !camera || clickableMeshes.length === 0) {
    return null;
  }

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(clickableMeshes, false);
  const firstHit = intersections.find(({ object }) => !object.userData.ignoreRaycast)?.object;

  return firstHit ? getNearestHotspotId(firstHit) : null;
}

/**
 * 更新 hover 状态、cursor 和高亮。
 *
 * @param hotspotId 当前 hover 的 hotspot ID；离开时为 null。
 */
function setHoveredHotspot(hotspotId: HotspotId | null): void {
  if (hoveredHotspotId === hotspotId) {
    return;
  }

  hoveredHotspotId = hotspotId;
  emit('hotspot-hover', hotspotId);

  if (renderer) {
    renderer.domElement.style.cursor = hotspotId ? 'pointer' : '';
  }

  refreshHighlight();
}

/**
 * 统一刷新模型高亮状态。
 *
 * hover 和 selected 都用独立线框表示，不改变模型 mesh 的 scale、position 或材质。
 */
function refreshHighlight(): void {
  const nextSelectedHotspotId = props.selectedHotspotId;
  const nextHoverHotspotId =
    hoveredHotspotId && hoveredHotspotId !== nextSelectedHotspotId ? hoveredHotspotId : null;

  if (selectedOutlineHotspotId !== nextSelectedHotspotId) {
    selectedOutline = replaceOutlineHelper(
      selectedOutline,
      nextSelectedHotspotId,
      selectedOutlineColor,
    );
    selectedOutlineHotspotId = nextSelectedHotspotId;
  }

  if (hoverOutlineHotspotId !== nextHoverHotspotId) {
    hoverOutline = replaceOutlineHelper(hoverOutline, nextHoverHotspotId, hoverOutlineColor);
    hoverOutlineHotspotId = nextHoverHotspotId;
  }
}

/**
 * 用新的 hotspot outline 替换旧 outline。
 *
 * @param current 当前 scene 中的 outline helper。
 * @param hotspotId 需要显示 outline 的 hotspot；null 表示移除。
 * @param color outline 颜色。
 * @returns 新的 helper，或 null。
 */
function replaceOutlineHelper(
  current: THREE.Box3Helper | null,
  hotspotId: HotspotId | null,
  color: THREE.Color,
): THREE.Box3Helper | null {
  removeOutlineHelper(current);

  if (!scene || !hotspotId) {
    return null;
  }

  const box = getHotspotBoundingBox(hotspotId);

  if (!box) {
    return null;
  }

  const helper = new THREE.Box3Helper(box, color);
  helper.userData.ignoreRaycast = true;
  helper.raycast = () => {};
  helper.renderOrder = 10;

  const material = helper.material as THREE.LineBasicMaterial;
  material.depthTest = false;
  material.depthWrite = false;
  material.transparent = true;
  material.opacity = 0.92;

  scene.add(helper);
  return helper;
}

/**
 * 从 scene 中移除 outline helper。
 *
 * @param helper 需要移除的 helper。
 */
function removeOutlineHelper(helper: THREE.Box3Helper | null): void {
  if (!helper) {
    return;
  }

  scene?.remove(helper);
  helper.geometry.dispose();

  if (Array.isArray(helper.material)) {
    for (const material of helper.material) {
      material.dispose();
    }
  } else {
    helper.material.dispose();
  }
}

/**
 * 根据 hotspot 的已注册 mesh 计算包围盒，略微外扩后作为 outline frame。
 *
 * @param hotspotId 需要框选的 hotspot ID。
 * @returns 可绘制的 Box3，或 null。
 */
function getHotspotBoundingBox(hotspotId: HotspotId): THREE.Box3 | null {
  const meshes = hotspotMeshes.get(hotspotId) ?? [];

  if (meshes.length === 0) {
    return null;
  }

  const box = new THREE.Box3();
  const meshBox = new THREE.Box3();

  for (const mesh of meshes) {
    meshBox.setFromObject(mesh);
    box.union(meshBox);
  }

  if (box.isEmpty()) {
    return null;
  }

  const size = box.getSize(new THREE.Vector3());
  const padding = Math.max(size.length() * 0.012, 0.025);
  box.expandByScalar(padding);

  return box;
}

/**
 * 从命中的 mesh 向上查找最近的 `Hotspot_` parent，避免 parent/child 间来回跳变。
 *
 * @param object raycaster 命中的对象。
 * @returns 最近的 hotspot ID。
 */
function getNearestHotspotId(object: THREE.Object3D): HotspotId | null {
  let current: THREE.Object3D | null = object;

  while (current) {
    if (isHotspotName(current.name)) {
      return current.name;
    }

    current = current.parent;
  }

  return (object.userData.hotspotId as HotspotId | undefined) ?? null;
}

/**
 * 复制 mesh 材质，避免 scenario 贴图替换改到 GLB 中共享的材质实例。
 *
 * @param mesh 模型中的任意 mesh。
 */
function cloneMaterialsForInteraction(mesh: THREE.Mesh): void {
  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map((material) => material.clone());
    return;
  }

  mesh.material = mesh.material.clone();
}

/**
 * 保存 mesh 材质的原始 map。
 *
 * @param mesh 模型中的任意 mesh。
 */
function captureMaterialSnapshots(mesh: THREE.Mesh): void {
  for (const material of getMeshMaterials(mesh)) {
    materialSnapshots.set(material.uuid, {
      map: hasMap(material) ? material.map : undefined,
    });
  }
}

/**
 * 获取 mesh 及其父级对象名组成的字符串。
 *
 * @param object 任意 Object3D。
 * @returns 从当前对象到根节点的名称拼接结果。
 */
function getObjectAncestryLabel(object: THREE.Object3D): string {
  const names: string[] = [];
  let current: THREE.Object3D | null = object;

  while (current) {
    if (current.name) {
      names.push(current.name);
    }
    current = current.parent;
  }

  return names.join(' ');
}

/**
 * 统一处理单材质和多材质 mesh。
 *
 * @param mesh Three.js mesh。
 * @returns 材质数组。
 */
function getMeshMaterials(mesh: THREE.Mesh): THREE.Material[] {
  return Array.isArray(mesh.material) ? mesh.material : [mesh.material];
}

/**
 * Object3D 到 Mesh 的类型守卫。
 *
 * @param object scene graph 中的对象。
 * @returns 如果对象是 mesh，返回 true。
 */
function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh;
}

/**
 * 判断材质是否拥有 map 贴图属性。
 *
 * @param material 任意 Three.js material。
 * @returns 如果材质支持 map 贴图，返回 true。
 */
function hasMap(
  material: THREE.Material,
): material is THREE.Material & { map: THREE.Texture | null } {
  return 'map' in material;
}
</script>
