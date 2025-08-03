import * as fs from "fs/promises";
import path from "path";

type Cache = any;

export namespace Misc {
	export const nanoid = (e = 21) => {
		const r = crypto.getRandomValues(new Uint8Array(e));
		let t = "";
		for (let n = 0; n < e; n++) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&r[n]!];
		return t;
	};

	export const sleep = (seconds: number) => new Promise<void>(r => setTimeout(r, seconds * 1_000));

	/** rounds a number to specified precision */
	export const round = (n: number, precision = 2): number => {
		const mul = Math.pow(10, precision);
		return Math.round(n * mul) / mul;
	};

	/** generates a pseudo Random Number Between two given (inclusive) */
	export const rnb = (min: number, max: number, precision = 0): number => parseFloat((Math.random() * (max - min) + min).toFixed(precision));

	export const jsonRead = async <T>(path: string) => fs.readFile(path, { encoding: "utf-8" }).then(str => JSON.parse(str) as T);
	export const jsonWrite = async (filePath: string, data: any) => {
		const tempPath = `${filePath}.tmp`;
		await fs.mkdir(path.dirname(filePath), { recursive: true }); // ensure directory exists
		await fs.writeFile(tempPath, JSON.stringify(data, undefined, 2), { encoding: "utf-8" }); // write to temporary file first
		await fs.rename(tempPath, filePath); // replace the original file
	};

	export const cacheRead = async () => Misc.jsonRead<Cache>("server/cache.json");
	export const cacheWrite = async (data: Cache) => Misc.jsonWrite("server/cache.json", data);
	export const cacheClear = async () => Misc.jsonWrite("server/cache.json", {});

	export const fetchWithRetry = async (url: string, init: RequestInit): Promise<Response | undefined> => {
		const retryAmount = 5;
		const baseDelay = 500;
		const maxDelay = 5000;

		for (let attempt = 0; attempt < retryAmount; attempt++) {
			let response: Response | undefined = undefined;
			try {
				response = await fetch(url, init);
				if (!response.ok) throw new Error(`Server error: ${response.status}`);
				return response;
			} catch (err: any) {
				console.error(err);

				// retry
				if (attempt < retryAmount-1) {
					const delay = Math.min(maxDelay, baseDelay * 2 ** attempt);
					const jitter = rnb(delay * 0.5, delay * 1.5);
					await Misc.sleep(jitter);
				}
			}
		}

		return undefined;
	};

	export const avg = (numbers: number[]) => numbers.length == 0 ? 0 : round(numbers.reduce((acc, val) => acc + val, 0) / numbers.length);
	export const med = (numbers: number[]) => {
		if (numbers.length == 0) return 0;
		const sorted = [...numbers].sort((a, b) => a - b);
		const mid = Math.floor(sorted.length / 2);
		return round((sorted.length % 2 == 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : (sorted[mid] ?? 0)));
	};

	export const escapeHtml = (str: string) => str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
