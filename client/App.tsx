import { Misc } from "@/src/Misc";

export const App = () => {
	fetch("/api/ping").then(res => res.json()).then(res => console.log(res));
	return <div>Hello World {Misc.uid()}</div>;
}