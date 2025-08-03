import { render } from "preact"
import { Misc } from "@/server/modules/Misc";

const Main = () => {
	fetch("/api/ping").then(res => res.json()).then(res => console.log(res, Misc.nanoid()));

	return <div>{BUILD_TYPE} {VERSION}</div>;
}

render(<Main/>, document.getElementById("app")!);
