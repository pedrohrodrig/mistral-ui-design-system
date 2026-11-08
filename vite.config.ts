/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'mistral-ui',
      fileName: 'mistral-ui',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@base-ui\/react(\/.*)?$/,
        'tailwind-variants',
        'tailwind-merge',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@base-ui/react/button': 'BaseUIButton',
          'tailwind-variants': 'TailwindVariants',
          'tailwind-merge': 'TailwindMerge',
        },
      },
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: ['**/*.stories.*', '**/*.d.ts', 'lib/index.ts'],
    },
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
