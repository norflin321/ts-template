import express from "express";
import { Misc } from "@/modules/Misc";
import { ROOT_DIR, SERVER_PORT } from "@/const";
import path from "path";

export namespace Server {
	export const init = async () => {
		const app = express();
		const api = express.Router();

		api.get("/ping", (req, res) => {
			res.json({ message: Misc.uid() });
		});
		app.use("/api", api);

		// server client build SPA
		const pathToClientBuild = path.join(ROOT_DIR, "client", "build");
		app.use(express.static(pathToClientBuild));
		app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(pathToClientBuild, "index.html")));

		console.log(`-- Server is listening on http://localhost:${SERVER_PORT}\n`);
		app.listen(SERVER_PORT);
	}
}