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
/** hover / selected 时使用的交通警示橙色。 */
const highlightColor = new THREE.Color('#ff9f1c');

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
/** 原始材质快照，用于 hover 后恢复颜色和贴图。 */
const materialSnapshots = new Map<string, MaterialSnapshot>();
/** 根据对象名猜测出的可替换贴图对象。 */
const displayTargets: DisplayTarget[] = [];
let hoveredHotspotId: HotspotId | null = null;
let highlightedHotspotId: HotspotId | null = null;
let initialCameraState: CameraState | null = null;

/** 保存初始相机视角，供 Reset view 按钮恢复。 */
interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/**
 * 材质原始状态快照。
 *
 * Three.js 材质类型很多，并不是每种材质都有 color、emissive 或 map。
 * 这里全部做成可选字段，恢复时再通过 type guard 判断。
 */
interface MaterialSnapshot {
  color?: THREE.Color;
  emissive?: THREE.Color;
  emissiveIntensity?: number;
  map?: THREE.Texture | null;
}

/**
 * 可被 scenario 贴图替换的 mesh。
 *
 * role 用来决定该 mesh 更像 e-paper 还是 kiosk；如果名字只包含 Display/Screen，
 * 就作为 generic 目标，优先使用 e-paper 贴图。
 */
interface DisplayTarget {
  mesh: THREE.Mesh;
  role: 'epaper' | 'kiosk' | 'generic';
  label: string;
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
  controls?.dispose();
  renderer?.dispose();
});

watch(
  () => props.scenarioId,
  () => {
    void applyScenarioTextures();
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
      void applyScenarioTextures();
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
 * 命名约定越清楚，贴图替换越准确。推荐后续模型命名包含 Epaper、Display、
 * Screen 或 Kiosk；Hotspot_StopSign_WithEPaper 和 Hotspot_BetterKiosk 也会被识别。
 *
 * @param label mesh 与其父级名称拼接后的字符串。
 * @returns display role；如果不是可替换贴图对象则返回 null。
 */
function classifyDisplayTarget(label: string): DisplayTarget['role'] | null {
  const normalized = label.toLowerCase();
  const isDisplay = /epaper|e-paper|display|screen|kiosk/.test(normalized);
  const isEpaperHotspot =
    normalized.includes('hotspot_stopsign_withepaper') ||
    normalized.includes('hotspot_epaperdisplay');
  const isKioskHotspot = normalized.includes('hotspot_betterkiosk');

  if (normalized.includes('kiosk') || isKioskHotspot) {
    return 'kiosk';
  }

  if (normalized.includes('epaper') || normalized.includes('e-paper') || isEpaperHotspot) {
    return 'epaper';
  }

  if (isDisplay) {
    return 'generic';
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
    const texture = target.role === 'kiosk' ? kioskTexture : (epaperTexture ?? kioskTexture);

    if (!texture) {
      continue;
    }

    applyTextureToMesh(target.mesh, texture);
  }
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
 * 把贴图应用到单个 mesh 的所有可贴图材质。
 *
 * @param mesh display target mesh。
 * @param texture 已加载的 scenario 贴图。
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
  camera.position.set(distance * 0.8, distance * 0.52, distance);
  camera.near = Math.max(distance / 100, 0.01);
  camera.far = distance * 100;
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
  const firstHit = intersections[0]?.object;

  return (firstHit?.userData.hotspotId as HotspotId | undefined) ?? null;
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
 * hover 的优先级高于 selected，所以用户可以在保留右侧选中说明的同时浏览其他组件。
 */
function refreshHighlight(): void {
  const nextHotspotId = hoveredHotspotId ?? props.selectedHotspotId;

  if (highlightedHotspotId === nextHotspotId) {
    return;
  }

  if (highlightedHotspotId) {
    resetHotspotMaterials(highlightedHotspotId);
  }

  highlightedHotspotId = nextHotspotId;

  if (highlightedHotspotId) {
    highlightHotspotMaterials(highlightedHotspotId);
  }
}

/**
 * 给指定 hotspot 的所有 mesh 增加轻微橙色高亮。
 *
 * @param hotspotId 需要高亮的 hotspot ID。
 */
function highlightHotspotMaterials(hotspotId: HotspotId): void {
  for (const mesh of hotspotMeshes.get(hotspotId) ?? []) {
    for (const material of getMeshMaterials(mesh)) {
      const snapshot = materialSnapshots.get(material.uuid);

      if (hasEmissive(material)) {
        material.emissive.copy(highlightColor);
        material.emissiveIntensity = Math.max(snapshot?.emissiveIntensity ?? 0, 0.32);
      } else if (hasColor(material) && snapshot?.color) {
        material.color.copy(snapshot.color).lerp(highlightColor, 0.22);
      }

      material.needsUpdate = true;
    }
  }
}

/**
 * 恢复指定 hotspot 的原始材质颜色和 emissive 状态。
 *
 * @param hotspotId 需要取消高亮的 hotspot ID。
 */
function resetHotspotMaterials(hotspotId: HotspotId): void {
  for (const mesh of hotspotMeshes.get(hotspotId) ?? []) {
    for (const material of getMeshMaterials(mesh)) {
      const snapshot = materialSnapshots.get(material.uuid);

      if (!snapshot) {
        continue;
      }

      if (hasEmissive(material) && snapshot.emissive) {
        material.emissive.copy(snapshot.emissive);
        material.emissiveIntensity = snapshot.emissiveIntensity ?? 0;
      }

      if (hasColor(material) && snapshot.color) {
        material.color.copy(snapshot.color);
      }

      material.needsUpdate = true;
    }
  }
}

/**
 * 复制 mesh 材质，避免 hover 高亮改到 GLB 中共享的材质实例。
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
 * 保存 mesh 材质的原始颜色、emissive 和 map。
 *
 * @param mesh 模型中的任意 mesh。
 */
function captureMaterialSnapshots(mesh: THREE.Mesh): void {
  for (const material of getMeshMaterials(mesh)) {
    materialSnapshots.set(material.uuid, {
      color: hasColor(material) ? material.color.clone() : undefined,
      emissive: hasEmissive(material) ? material.emissive.clone() : undefined,
      emissiveIntensity: hasEmissive(material) ? material.emissiveIntensity : undefined,
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
 * 判断材质是否拥有 color 属性。
 *
 * @param material 任意 Three.js material。
 * @returns 如果材质可以修改 color，返回 true。
 */
function hasColor(material: THREE.Material): material is THREE.Material & { color: THREE.Color } {
  return 'color' in material && material.color instanceof THREE.Color;
}

/**
 * 判断材质是否拥有 emissive 属性。
 *
 * @param material 任意 Three.js material。
 * @returns 如果材质可以修改 emissive，返回 true。
 */
function hasEmissive(
  material: THREE.Material,
): material is THREE.Material & { emissive: THREE.Color; emissiveIntensity: number } {
  return 'emissive' in material && material.emissive instanceof THREE.Color;
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
