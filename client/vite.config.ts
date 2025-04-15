import checker from "vite-plugin-checker";
import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import path from "path"

export default defineConfig({
	plugins: [
		checker({ typescript: { root: "./client", tsconfigPath: path.resolve(__dirname, "./tsconfig.client.json"), }, overlay: { initialIsOpen: false } }),
		preact(),
	],

	root: path.resolve(__dirname),
	resolve: {
		alias: { "@": path.resolve(__dirname, "..") },
	},

	build: {
		outDir: "build",
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(__dirname, "index.html"),
		},
	},
})