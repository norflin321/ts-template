import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import path from "path"

export default defineConfig({
	plugins: [preact()],
	base: "./",
	resolve: {
		alias: { "@": path.resolve(__dirname, "src") },
	},
	root: path.resolve(__dirname)
})