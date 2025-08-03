import { ROOT, SERVER_PORT } from "@/const";
import { Misc } from "@/modules/Misc";
import express from "express";
import path from "path";

export namespace Server {
	export const init = async () => {
		const app = express();
		const api = express.Router();

		api.get("/ping", (_, res) => {
			res.json({ message: Misc.nanoid() });
		});
		app.use("/api", api);

		// serve client SPA build
		const pathToClientBuild = path.join(ROOT, "client", "build");
		app.use(express.static(pathToClientBuild));
		app.get(/^\/(?!api).*/, (_, res) => res.sendFile(path.join(pathToClientBuild, "index.html")));

		console.log(`\n  ➜  Server: http://localhost:${SERVER_PORT}\n`);
		app.listen(SERVER_PORT);
	}
}
