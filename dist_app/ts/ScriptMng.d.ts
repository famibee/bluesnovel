import { SysBase } from '../sn/SysBase';
import { T_HTag } from '../sn/Grammar';
import { T_INIT_FNCS } from '../store/store';
type T_TRACE = (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
export declare class ScriptMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase);
    attachTsx(trgNext: () => void, fncs: T_INIT_FNCS, hTag: T_HTag): void;
    $trgNext: () => void;
    $fncs: T_INIT_FNCS;
    load(fn: string): Promise<void>;
    go(): void;
    readonly myTrace: T_TRACE;
}
export {};
//# sourceMappingURL=ScriptMng.d.ts.map