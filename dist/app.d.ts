import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import type { T_SysBaseParams } from './sn/CmnInterface';
export declare class SysApp {
    constructor(...[hPlg, arg]: T_SysBaseParams);
    init(): Promise<void>;
}
