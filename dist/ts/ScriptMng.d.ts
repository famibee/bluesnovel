import { SysBase } from './SysBase';
import { IHTag } from './Grammar';
import { T_INIT_FNCS } from '../store/store';
import { Variable } from './Variable';
import { PropParser } from './PropParser';
type T_TRACE = (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
export declare class ScriptMng {
    #private;
    private readonly sys;
    private readonly hTag;
    private readonly trgNext;
    private readonly fncs;
    readonly val: Variable;
    readonly prpPrs: PropParser;
    constructor(sys: SysBase, hTag: IHTag, trgNext: () => void, fncs: T_INIT_FNCS, val: Variable, prpPrs: PropParser);
    load(fn: string): Promise<void>;
    go(): void;
    タグ解析(tagToken: string): boolean;
    readonly myTrace: T_TRACE;
}
export {};
//# sourceMappingURL=ScriptMng.d.ts.map