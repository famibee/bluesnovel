import type { T_MARK } from './SaveMng';
export type T_PAGE_ENT = {
    key: string;
    fn: string;
    idx: number;
    mark: T_MARK;
    clearOnResume: boolean;
};
export type T_PAGE_TO = 'oldest' | 'prev' | 'next' | 'newest' | 'exit' | 'load';
export declare const A_PAGE_TO: T_PAGE_TO[];
export declare const INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
export declare class PageLog {
    #private;
    private readonly maxLen;
    constructor(maxLen: () => number);
    get len(): number;
    get pos(): number;
    get isPaging(): boolean;
    push(fn: string, idx: number, mark: T_MARK, clearOnResume: boolean): void;
    clear(): void;
    move(to: T_PAGE_TO): T_PAGE_ENT | undefined;
    json(): string;
}
