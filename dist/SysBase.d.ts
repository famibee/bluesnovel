import { HPlugin, ISysBase } from './CmnInterface';
import { IConfig, ISysRoots } from './ts/ConfigBase';
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
    protected init(): Promise<void>;
    cfg: IConfig;
    protected $path_downloads: string;
    get path_downloads(): string;
    protected $path_userdata: string;
    get path_userdata(): string;
    readonly dec: (_ext: string, tx: string) => Promise<string>;
    readonly hash: (_str: string) => string;
}
export {};
//# sourceMappingURL=SysBase.d.ts.map