
import { mkdirSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'copy-spa-routes',
			closeBundle() {
				const distDirectory = resolve('dist');
				const routeDirectories = [
					'about',
					'math',
					'reading',
					'videos',
					'podcast',
					'parent-resources'
				];

				for (const routeDirectory of routeDirectories) {
					const routePath = resolve(distDirectory, routeDirectory);
					mkdirSync(routePath, { recursive: true });
					copyFileSync(resolve(distDirectory, 'index.html'), resolve(routePath, 'index.html'));
				}
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

