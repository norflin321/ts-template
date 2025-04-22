import { ROOT_DIR } from "@/const";
import Database from "better-sqlite3";

export namespace Db {
	export let db: Database.Database

	export const init = () => {
		db = new Database(`${ROOT_DIR}/main.db`);
		db.pragma("journal_mode = WAL");
	}
}