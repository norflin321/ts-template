import { Database } from "@/server/modules/Database";
import { Server } from "@/server/modules/Server";

export namespace Main {
	export const init = async () => {
		await Database.init();
		await Server.init();
	}
}
await Main.init();
