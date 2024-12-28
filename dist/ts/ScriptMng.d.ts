import { SysBase } from './SysBase';
import { IHTag } from './Grammar';
import { T_INIT_FNCS } from '../store/store';
type T_TRACE = (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
export declare class ScriptMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase);
    attachTsx(trgNext: () => void, fncs: T_INIT_FNCS, hTag: IHTag): void;
    $trgNext: () => void;
    $fncs: T_INIT_FNCS;
    load(fn: string): Promise<void>;
    go(): void;
    readonly myTrace: T_TRACE;
    dumpErrForeLine(): void;
}
export {};
//# sourceMappingURL=ScriptMng.d.ts.map