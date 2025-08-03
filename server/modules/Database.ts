import { ROOT } from "@/server/const";
import SQLite3 from "better-sqlite3";

export namespace Database {
	export let db: SQLite3.Database

	export const init = async () => {
		db = new SQLite3(`${ROOT}/server/sqlite3.db`);
		db.pragma("journal_mode = WAL");
	}
}
