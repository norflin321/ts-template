export namespace Misc {
	export const uid = (e = 21) => {
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
}