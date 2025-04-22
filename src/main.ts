import { SERVER_PORT } from "@/const";
import { App } from "@/modules/App";

console.log(`-- Server is running at http://localhost:${SERVER_PORT}\n`);
App.init();