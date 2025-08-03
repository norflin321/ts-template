import preact from "@preact/preset-vite";
import viteLegacyPlugin from "@vitejs/plugin-legacy";
import path from "path";
import { defineConfig, PluginOption } from "vite";
import checker from "vite-plugin-checker";

const VERSION = 1;

export default defineConfig(async ({ command, mode }) => {
	const plugins: PluginOption[] = [
		preact(),

		viteLegacyPlugin({
			targets: ["defaults", "not IE 11"], // define your browser targets
			renderLegacyChunks: false, // disable separate legacy chunks
			modernPolyfills: true, // include polyfills for modern bundle
		})
	];

	if (command == "serve") {
		plugins.push([
			checker({ typescript: { root: "./client", tsconfigPath: path.resolve(__dirname, "./tsconfig.client.json"), }, overlay: { initialIsOpen: false } }),

			{
				name: "disable-hot-reload",
				handleHotUpdate: ({ server }: { server: any }) => {
					server.ws.send({ type: "full-reload" });
					return [];
				}
			},
		]);
	}

	return {
		plugins,

		root: path.resolve(__dirname),
		resolve: {
			alias: { "@": path.resolve(__dirname, "..") },
		},

		build: {
			outDir: "build",
			assetsDir: "",
			emptyOutDir: true,
			rollupOptions: {
				input: path.resolve(__dirname, "index.html"),
				output: { inlineDynamicImports: true },
			},
			sourcemap: false,
			minify: true,
			chunkSizeWarningLimit: 2000,
		},

		define: { BUILD_TYPE: `"${mode}"`, VERSION: `"${VERSION}"` },

		server: {
			proxy: { "/api": { target: "http://localhost:8080" } }
		}
	}
})