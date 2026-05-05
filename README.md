# Better Stop

INFO 303 Multimodal Remix final project. This is a static interactive website for a stop-level MTD wayfinding prototype at **Fourth & Peabody**. The site is built with Vite, Vue 3, TypeScript, and Three.js, and is designed to deploy as a static GitHub Pages artifact.

## 项目定位

这个网站把之前的 Better Kiosk / CUMTD-MTD wayfinding research remix 成一个面向乘客的交互原型。它不是完整公交系统，也不是专业 design book，而是用一个具体站点展示 stop-level wayfinding 如何帮助 first-time / occasional MTD riders 做出上车决策。

页面重点回答四类乘客问题：

1. 我现在在哪里？
2. 我应该在哪个 corner / direction 上车？
3. 如果有 reroutes、alerts、limited service 或 exact arrival times，我应该去哪里看？
4. 如果我需要语言帮助、无障碍帮助或语音提示，我应该怎么获取？

## 运行方式

```bash
npm install
npm run dev
npm run lint
npm run format:check
npm run build
```

本地开发时运行 `npm run dev`。提交前建议运行 `npm run lint`、`npm run format:check` 和 `npm run build`。静态部署前运行 `npm run build`，生成文件会输出到 `dist/`。

## 目录结构

```text
public/
  models/
    better-stop.glb
  textures/
    epaper-normal.png
    epaper-limited.png
    epaper-reroute.png
    kiosk-normal.png
    kiosk-alert.png
src/
  components/
    ThreeScene.vue
    InfoPanel.vue
    ScenarioControls.vue
    LanguageSwitcher.vue
    RationaleSection.vue
  data/
    hotspots.ts
    scenarios.ts
    rationale.ts
  i18n/
    en.ts
    zh.ts
    es.ts
    index.ts
    types.ts
  App.vue
  main.ts
  style.css
```

## 如何修改模型

主模型路径在 [src/components/ThreeScene.vue](src/components/ThreeScene.vue) 的 `modelPath`：

```ts
const modelPath = buildPublicAssetPath('models', 'better-stop.glb');
```

默认模型文件放在 `public/models/better-stop.glb`。如果换文件名，只需要改这里和 `public/models/` 中的文件。

模型中的交互对象需要使用 `Hotspot_` 前缀，例如：

```text
Hotspot_StopSign_WithEPaper
Hotspot_BetterKiosk
Hotspot_PrintPanel
```

`ThreeScene.vue` 会 traverse 整个 GLB scene，自动注册所有以 `Hotspot_` 开头的对象。对象可以是 mesh，也可以是 group；如果是 group，它的子 mesh 会被一起注册为同一个 hotspot。

## 如何修改 hotspot 文案

Hotspot 文案在 i18n 文件中：

- English: [src/i18n/en.ts](src/i18n/en.ts)
- Chinese: [src/i18n/zh.ts](src/i18n/zh.ts)
- Spanish: [src/i18n/es.ts](src/i18n/es.ts)

新增模型 hotspot 后，在每个语言文件的 `hotspots` 对象里加同名 key：

```ts
Hotspot_NewComponent: {
  title: '...',
  short: '...',
  detail: '...',
}
```

如果某个语言缺少文案，页面会 fallback 到 English。如果某个 hotspot 完全没有 metadata，页面会显示 default 说明，不会崩溃。

## 如何修改 scenario 和贴图

Scenario ID 和贴图文件名在 [src/data/scenarios.ts](src/data/scenarios.ts)：

```ts
export const SCENARIO_TEXTURES = {
  normal: {
    epaper: 'epaper-normal.png',
    kiosk: 'kiosk-normal.png',
  },
  ...
};
```

贴图文件应放在 `public/textures/`。当前支持的建议文件名：

- `epaper-normal.png`
- `epaper-limited.png`
- `epaper-reroute.png`
- `kiosk-normal.png`
- `kiosk-alert.png`

如果贴图文件暂时不存在，Three.js 会在 console 输出 warning，并继续使用模型原始材质。页面 UI 和 scenario 说明仍会正常更新。

`ThreeScene.vue` 会尝试查找以下对象作为可替换贴图目标：

- `Hotspot_StopSign_WithEPaper`
- `Hotspot_EpaperDisplay`
- 任何名字或父级名字包含 `Epaper`、`Display`、`Screen`、`Kiosk` 的 mesh

命名越明确，贴图替换越稳定。

## i18n 设计

这个项目没有引入大型 i18n library。语言切换逻辑在 [src/i18n/index.ts](src/i18n/index.ts)，App 维护 `currentLanguage` state。

语言切换只改变显示文本，不重新加载模型，也不会清除当前选中的 hotspot 或 scenario。

## 代码注释规范

项目中的 TypeScript 文件和 Vue `<script setup>` 主要使用中文 JSDoc 注释：

- 类型和 interface 说明数据结构的用途。
- 核心函数说明参数、返回值和维护影响。
- Three.js 逻辑说明 GLB 加载、hotspot 注册、raycast、高亮和贴图 fallback。

后续维护时优先查看这些文件：

- [src/components/ThreeScene.vue](src/components/ThreeScene.vue): 模型加载、热点交互、贴图切换。
- [src/i18n/en.ts](src/i18n/en.ts): 英文基准文案。
- [src/data/scenarios.ts](src/data/scenarios.ts): scenario ID 和贴图文件名。

## Lint 和 CI

本项目使用 ESLint flat config，配置文件是 [eslint.config.js](eslint.config.js)。

可用命令：

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm run build
```

GitHub Actions:

- [CI](.github/workflows/ci.yml): 在 pull request，以及 push 到 `main` / `master` 时运行 `npm ci`、`npm run lint`、`npm run format:check`、`npm run build`。
- [Deploy GitHub Pages](.github/workflows/deploy-pages.yml): 在 push 到 `main` / `master` 或手动触发时运行 lint、format check、build，并部署 `dist/`。

## GitHub Pages

`vite.config.ts` 使用 `base: './'`，因此 build 后的静态文件可以放到 GitHub Pages 子路径下运行。部署时把 `dist/` 作为 Pages artifact 即可。

第一次把 repo 发到 GitHub 后，在 GitHub 仓库里进入 **Settings → Pages**，把 **Build and deployment → Source** 设为 **GitHub Actions**。之后 push 到 `main` 或 `master` 就会自动部署。

如果之后你把仓库改成严格的 repo 子路径部署，也可以把 [vite.config.ts](vite.config.ts) 的 `base` 改成 `'/REPO_NAME/'`。
