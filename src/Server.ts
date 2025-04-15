import express from "express";
import { Misc } from "@/Misc";
import { ROOT_DIR, SERVER_PORT } from "@/const";
import path from "path";

export namespace Server {
	export const start = async () => {
		const app = express();
		const api = express.Router();

		api.get("/ping", (req, res) => {
			res.json({ message: "pong" });
		});

		app.use("/api", api);

		// server client build SPA
		const pathToClientBuild = path.join(ROOT_DIR, "client", "build");
		app.use(express.static(pathToClientBuild));
		app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(pathToClientBuild, "index.html")));

		app.listen(SERVER_PORT);

		Misc.sayHello();
	}
}