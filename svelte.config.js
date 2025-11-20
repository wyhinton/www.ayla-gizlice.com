import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(), // still needed if you use TS/SCSS/etc.
  kit: {
    adapter: adapter({
      out: "functions/build", // move output into functions folder
    }),
  },
};
