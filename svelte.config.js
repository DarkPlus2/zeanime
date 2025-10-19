import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
export default {
  preprocess: preprocess({ postcss: true }),
                kit: {     adapter: adapter(),
                      outDir: 'build'   } };` 
