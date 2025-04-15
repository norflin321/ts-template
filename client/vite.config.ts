import checker from "vite-plugin-checker";
import { defineConfig, PluginOption } from "vite"
import preact from "@preact/preset-vite"
import path from "path"

export default defineConfig(async ({ command }) => {
	const plugins: PluginOption[] = [
		preact(),
	];
	if (command == "serve") {
		plugins.push(checker({ typescript: { root: "./client", tsconfigPath: path.resolve(__dirname, "./tsconfig.client.json"), }, overlay: { initialIsOpen: false } }));
	}

	return {
		plugins,

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
		server: {
			proxy: { "/api": { target: "http://localhost:8080" } }
		}
	}
})