import { SysBase } from './SysBase';
export declare class ScriptIterator {
    #private;
    private readonly sys;
    addIdxToken(): void;
    subIdxToken(): void;
    get lineNum(): number;
    readonly addLineNum: (len: number) => number;
    load(fn: string): Promise<ArrayIterator<string>>;
    strPos: () => string;
    dumpErrForeLine(): void;
    constructor(sys: SysBase);
}
//# sourceMappingURL=ScriptIterator.d.ts.map