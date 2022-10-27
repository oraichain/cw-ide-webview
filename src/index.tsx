import * as ReactDOM from "react-dom";
import "./polyfill";
import App from "./App";
import "./index.css";
import Keplr from "src/lib/Keplr";
import { ChainStore } from "./stores/chain";
import { EmbedChainInfos } from "./config";
import * as os from "os";

window.chainStore = new ChainStore(EmbedChainInfos);

// export default Keplr;
// global Keplr
window.Keplr = new Keplr();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

if (navigator.platform.indexOf('Mac') > -1) {
  let ctrlDown = false;
  const ctrlKey = "Meta";

  const commandMap = {
    a: "selectAll",
    c: "copy",
    v: "paste",
    x: "cut",
    z: "undo",
    shift_z: "redo"
  };

  document.addEventListener("keydown", e => {
    if (e.key === ctrlKey) ctrlDown = true;
  });
  document.addEventListener("keyup", e => {
    if (e.key === ctrlKey) ctrlDown = false;
  });

  document.addEventListener("keydown", e => {
    if (ctrlDown) {
      let command = commandMap[e.shiftKey ? "shift_" : "" + e.key];
      if (command) document.execCommand(command);
    }
  });
}
