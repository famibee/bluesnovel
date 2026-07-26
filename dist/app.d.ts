import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import { SysBase } from './sn/SysBase';
import type { T_SysBaseParams, T_SysBaseLoadedParams } from './sn/CmnInterface';
export declare class SysApp extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    close(): void;
    window(o: {
        centering: boolean;
        x: number;
        y: number;
        w: number;
        h: number;
    }): void;
}
