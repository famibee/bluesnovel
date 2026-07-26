import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import { SysBase } from './sn/SysBase';
import type { T_SysBaseParams } from './sn/CmnInterface';
export declare class SysWeb extends SysBase {
    constructor(...[hPlg, arg]: T_SysBaseParams);
}
