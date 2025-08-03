import { ROOT } from "@/server/const";
import { Misc } from "@/server/modules/Misc";
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

		const port = 8080;
		console.log(`\n  ➜  Server: http://localhost:${port}\n`);
		app.listen(port);
	}
}
