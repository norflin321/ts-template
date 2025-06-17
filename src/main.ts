import { Db } from "@/modules/Db";

import { Server } from "@/modules/Server";

const main = async () => {
	Db.init();
	Server.init();
}
main();