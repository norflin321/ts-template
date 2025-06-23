import { render } from "preact"
import { Misc } from "@/src/modules/Misc";

const App = () => {
	fetch("/api/ping").then(res => res.json()).then(res => console.log(res));
	return <div>Hello World {Misc.nanoid()}</div>;
}

render(<App/>, document.getElementById("app")!);
