import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import { SysBase } from './sn/SysBase';
import type { T_SysBaseParams, T_SysBaseLoadedParams } from './sn/CmnInterface';
import type { T_CAPTURE_RECT } from './preload';
import { type T_DATA4VARI_TRANSPORT } from './ts/SaveMng';
export declare class SysApp extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    readonly appendFile: (path: string, data: string) => Promise<void>;
    close(): void;
    window(o: {
        centering: boolean;
        x: number;
        y: number;
        w: number;
        h: number;
    }): void;
    capturePage(rect: T_CAPTURE_RECT, outW: number, outH: number, mime: string): Promise<string>;
    updateCheck(url: string): void;
    storeLoad(ns: string): Promise<T_DATA4VARI_TRANSPORT | undefined>;
    storeFlush(_ns: string, data: T_DATA4VARI_TRANSPORT): Promise<void>;
}
