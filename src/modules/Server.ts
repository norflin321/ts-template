import express, { Express } from "express";
import { Misc } from "@/modules/Misc";
import { ROOT_DIR, SERVER_PORT } from "@/const";
import path from "path";

export namespace Server {
	const setupApiRoutes = (app: Express) => {
		const api = express.Router();

		api.get("/ping", (req, res) => {
			res.json({ message: Misc.uid() });
		});

		app.use("/api", api);
	}

	export const start = async () => {
		const app = express();
		setupApiRoutes(app);

		// server client build SPA
		const pathToClientBuild = path.join(ROOT_DIR, "client", "build");
		app.use(express.static(pathToClientBuild));
		app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(pathToClientBuild, "index.html")));

		app.listen(SERVER_PORT);
	}
}