import type { T_HPlugin, T_SysBase, T_SysBaseLoadedParams } from './CmnInterface';
import { T_Config, T_SysRoots } from './ConfigBase';
type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export declare class SysBase implements T_SysRoots, T_SysBase {
    readonly hPlg: T_HPlugin;
    readonly arg: HSysBaseArg;
    constructor(hPlg: T_HPlugin | undefined, arg: HSysBaseArg);
    protected loaded(...[_hPlg,]: T_SysBaseLoadedParams): Promise<void>;
    cfg: T_Config;
    setMain(cfg: T_Config): void;
    protected run(): Promise<void>;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    readonly dec: (_ext: string, tx: string) => Promise<string>;
    readonly hash: (_str: string) => string;
}
export {};
