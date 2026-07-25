import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // API response shapes are owned by the backend and intentionally typed as
      // `any` on this side — see CLAUDE.md "TypeScript". Leaving this on errored
      // on ~96 deliberate uses and drowned out every real finding.
      '@typescript-eslint/no-explicit-any': 'off',
      // Dev-only HMR ergonomics, not correctness. Several modules deliberately
      // colocate a component with its constants or hook (TopBar/TABS, useTheme,
      // I18nProvider) because the "Adding a tab" convention depends on it.
      'react-refresh/only-export-components': 'warn',
    },
  },
])
