import { T_HPlugin, T_Plugin, T_PluginInitArg, T_SysBaseParams } from './sn/CmnInterface';
import { TArg } from './sn/Grammar';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
export type { TArg };
export declare class SysApp {
    constructor(...[hPlg, arg]: T_SysBaseParams);
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map