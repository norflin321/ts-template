import { Server } from "@/modules/Server";
import { SERVER_PORT } from "@/const";

console.log(`-- Server is running at http://localhost:${SERVER_PORT}\n`);

Server.start();