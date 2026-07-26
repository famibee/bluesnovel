export declare function setEscape(ce: string): void;
export type T_LNK = {
    label: string;
    fn: string;
    call: boolean;
    arg: string;
    url?: string;
    sh?: string;
    hint?: string;
    hs?: string;
    ho?: string;
};
export type T_CH = {
    c: string;
    r?: string;
    s?: string;
    rs?: string;
    tcy?: true;
    lnk?: T_LNK;
    pic?: string;
    src?: string;
};
export declare function splitCh(raw: string): T_CH[];
export declare function plainOf(aCh: readonly T_CH[]): string;
export declare function plainTxt(raw: string): string;
export declare function rubyTxt(r: string): string;
