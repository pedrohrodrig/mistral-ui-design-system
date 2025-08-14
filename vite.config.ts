import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			name: 'mistral-ui',
			fileName: 'mistral-ui',
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'react/jsx-runtime',
				},
			},
		},
	},
});
