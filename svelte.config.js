import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkBreaks from 'remark-breaks';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			remarkPlugins: [remarkBreaks] // Convert single line breaks to <br>
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$db: 'src/lib/db'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
