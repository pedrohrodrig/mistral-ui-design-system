/// <reference types="vitest/config" />

import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { preserveUseClient } from './scripts/preserve-use-client';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), preserveUseClient()],
  build: {
    lib: {
      // O CSS é uma entrada própria: o consumidor importa
      // '@mistral-ui/design-system/styles.css' explicitamente.
      entry: {
        index: resolve(dirname, 'lib/index.ts'),
        styles: resolve(dirname, 'lib/styles.css'),
      },
      formats: ['es'],
    },
    // Necessário para usar o CSS como entrada própria do build.
    cssCodeSplit: true,
    // Os arquivos de public/ não fazem parte da biblioteca.
    copyPublicDir: false,
    rollupOptions: {
      // Dependências e peerDependencies ficam fora do bundle; o consumidor as
      // instala e o bundler dele resolve uma única cópia de cada.
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        'tailwind-variants',
        'tailwind-merge',
      ],
      output: {
        // Um arquivo por módulo: melhora o tree-shaking e permite manter a
        // diretiva "use client" só nos componentes que precisam dela.
        preserveModules: true,
        preserveModulesRoot: 'lib',
        entryFileNames: '[name].js',
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
