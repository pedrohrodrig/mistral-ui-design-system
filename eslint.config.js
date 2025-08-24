// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        import: importPlugin,
      },
      rules: {
        // Regras de organização de imports
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'import/no-unresolved': 'error',
        'import/no-duplicates': 'error',

        // Regras gerais de formatação
        indent: ['error', 2],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'es5'],
        'max-len': [
          'error',
          {
            code: 80,
            tabWidth: 2,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],

        // Regras específicas do React
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  storybook.configs['flat/recommended']
);
