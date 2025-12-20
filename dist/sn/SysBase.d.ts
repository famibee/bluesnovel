import { HPlugin, ISysBase, T_SysBaseLoadedParams } from './CmnInterface';
import { IConfig, IFn2Path, ISysRoots } from './ConfigBase';
import { Caretaker } from './Memento';
type HSysBaseArg = {
    cur: string;
    crypto: boolean;
    dip: string;
};
export declare class SysBase implements ISysRoots, ISysBase {
    #private;
    readonly hPlg: HPlugin;
    readonly arg: HSysBaseArg;
    constructor(hPlg: HPlugin | undefined, arg: HSysBaseArg);
    protected loaded(...[_hPlg,]: T_SysBaseLoadedParams): Promise<void>;
    load: (_url: string) => Promise<string>;
    fetch: (url: string, init?: RequestInit) => Promise<Response>;
    get caretaker(): Caretaker;
    cfg: IConfig;
    loadPath(hPathFn2Exts: IFn2Path, cfg: IConfig): Promise<void>;
    protected run(): Promise<void>;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    readonly dec: (_ext: string, tx: string) => Promise<string>;
    readonly hash: (_str: string) => string;
}
export {};
//# sourceMappingURL=SysBase.d.ts.map