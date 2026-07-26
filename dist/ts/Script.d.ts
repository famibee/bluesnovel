import { Grammar } from '../sn/Grammar';
export declare class Script {
    #private;
    readonly fn: string;
    readonly grm: Grammar;
    get aToken(): readonly string[];
    constructor(fn: string, src: string, grm?: Grammar);
    get len(): number;
    label2idx(label: string): number | undefined;
    defC2M(tag: 'char2macro' | 'bracket2macro', args: {
        [k: string]: string;
    }, hTag: {
        [nm: string]: boolean;
    }, start_idx: number): void;
}
