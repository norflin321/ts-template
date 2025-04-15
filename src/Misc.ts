export namespace Misc {
	export const sayHello = () => {
		console.log("hello", uid(5));
	}

	export const uid = (e = 21) => {
		const r = crypto.getRandomValues(new Uint8Array(e));
		let t = "";
		for (let n = 0; n < e; n++) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&r[n]!];
		return t;
	};
}