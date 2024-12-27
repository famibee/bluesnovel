import { SysBase } from './SysBase';
import { T_INIT_FNCS } from '../store/store';
export declare class ScriptMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase);
    init(trgNext: () => void, fncs: T_INIT_FNCS): void;
    $trgNext: () => void;
    $fncs: T_INIT_FNCS;
    load(fn: string): Promise<void>;
    go(): void;
}
//# sourceMappingURL=ScriptMng.d.ts.map