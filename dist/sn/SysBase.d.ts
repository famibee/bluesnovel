import type { T_HPlugin, T_SysBase, T_SysBaseLoadedParams } from './CmnInterface';
import { T_Config, T_SysRoots } from './ConfigBase';
import type { T_DATA4VARI_TRANSPORT } from '../ts/SaveMng';
import type { ScriptMng } from '../ts/ScriptMng';
type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export declare class SysBase implements T_SysRoots, T_SysBase {
    #private;
    readonly hPlg: T_HPlugin;
    readonly arg: HSysBaseArg;
    constructor(hPlg: T_HPlugin | undefined, arg: HSysBaseArg);
    protected loaded(...[hPlg,]: T_SysBaseLoadedParams): Promise<void>;
    cfg: T_Config;
    setMain(cfg: T_Config): void;
    scrMng: ScriptMng | undefined;
    protected titleSub(_txt: string): void;
    protected run(): Promise<void>;
    stop(): Promise<void>;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    dec: (_ext: string, tx: string) => Promise<string>;
    decAB: (ab: ArrayBuffer) => Promise<ArrayBuffer>;
    enc: (tx: string) => Promise<string>;
    readonly fetch: (url: string, init?: RequestInit) => Promise<Response>;
    hash: (_str: string) => string;
    appendFile(_path: string, _data: string): Promise<void>;
    get crypto(): boolean;
    storeLoad(ns: string): Promise<T_DATA4VARI_TRANSPORT | undefined>;
    storeFlush(ns: string, data: T_DATA4VARI_TRANSPORT): Promise<void>;
    close(): void;
    window(_o: {
        centering: boolean;
        x: number;
        y: number;
        w: number;
        h: number;
    }): void;
    updateCheck(_url: string): void;
    capturePage(_rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, _outW: number, _outH: number, _mime: string): Promise<string>;
}
export {};
