import { ROOT } from "@/const";
import SQLite3 from "better-sqlite3";

export namespace Database {
	export let db: SQLite3.Database

	export const init = () => {
		db = new SQLite3(`${ROOT}/server/main.db`);
		db.pragma("journal_mode = WAL");
	}
}
