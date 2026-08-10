import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import { SysBase } from './sn/SysBase';
import type { T_SysBaseParams, T_SysBaseLoadedParams } from './sn/CmnInterface';
export declare class SysWeb extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    appendFile(path: string, data: string): Promise<void>;
}
