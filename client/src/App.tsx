import { Misc } from "@/../../server/modules/Misc";

export const App = () => {
	return <div>Hello World {Misc.uid()}</div>;
}