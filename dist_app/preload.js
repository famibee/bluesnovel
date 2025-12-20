import { ipcRenderer } from "electron";
var fncE = console.error;
const to_app = { getInfo: () => ipcRenderer.invoke("getInfo").catch(fncE) };
export { to_app };

//# sourceMappingURL=preload.js.map