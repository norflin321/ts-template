import { Database } from "@/modules/Database";
import { Server } from "@/modules/Server";

const main = async () => {
	Database.init();
	Server.init();
}
main();
