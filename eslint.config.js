import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';

/**
 * ESLint flat config。
 *
 * 这个项目是 Vue 3 + TypeScript + Vite，不使用 Nuxt/Router/Pinia。
 * 配置目标是抓明显错误和维护风险，而不是强制复杂风格规则。
 */
export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'tmp/**',
      '.vite/**',
      'public/models/**',
      'public/textures/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // App.vue、InfoPanel.vue 等课程项目组件名较短，关闭多词组件名限制。
      'vue/multi-word-component-names': 'off',
      // 当前 Vue 组件 props 已用 TypeScript interface + 中文 JSDoc 说明。
      'vue/require-default-prop': 'off',
      // 不用 ESLint 管模板换行格式，避免和课程项目手写排版冲突。
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },
  {
    files: ['*.config.js', '*.config.ts', 'vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
