import { ipcRenderer as o } from "electron";
const e = console.error, r = {
  getInfo: () => o.invoke("getInfo").catch(e)
  // :
};
export {
  r as to_app
};
//# sourceMappingURL=preload.js.map
