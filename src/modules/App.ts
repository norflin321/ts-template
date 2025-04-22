import { Server } from "@/modules/Server";
import { Db } from "@/modules/Db";

export namespace App {
	export const init = () => {
		Db.init();
		Server.init();
	}
}