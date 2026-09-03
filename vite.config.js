
import { mkdirSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'copy-podcast-route',
			closeBundle() {
				const distDirectory = resolve('dist');
				mkdirSync(resolve(distDirectory, 'podcast'), { recursive: true });
				copyFileSync(resolve(distDirectory, 'index.html'), resolve(distDirectory, 'podcast/index.html'));
			}
		}
	],
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.[jt]sx?$/,
		exclude: []
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	},
});

