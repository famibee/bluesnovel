import { HPlugin, IPlugin, IPluginInitArg, T_SysBaseLoadedParams, T_SysBaseParams } from './ts/CmnInterface';
import { SysBase } from './ts/SysBase';
import { IFn2Path, IConfig } from './ts/ConfigBase';
export type { HPlugin, IPlugin, IPluginInitArg };
export declare class SysWeb extends SysBase {
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    protected run: () => Promise<void>;
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
}
//# sourceMappingURL=web.d.ts.map