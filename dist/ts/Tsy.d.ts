export declare const A_TSY_PRP: readonly ["alpha", "left", "top", "width", "height", "rotation", "scale_x", "scale_y", "pivot_x", "pivot_y"];
export type T_TSY_PRP = typeof A_TSY_PRP[number];
export declare const A_TSY_FRM_PRP: readonly ["alpha", "x", "y", "width", "height", "scale_x", "scale_y", "rotate"];
export type T_TSY_FRM_PRP = typeof A_TSY_FRM_PRP[number];
export type T_TSY_TO = {
    [prp: string]: {
        v: number;
        rel: boolean;
    } | undefined;
};
export declare const H_TSY_DEF: {
    [K in T_TSY_PRP]?: number;
};
export declare function cnvTweenArg(tag: string, args: {
    [k: string]: string;
}, aPrp?: readonly string[]): T_TSY_TO;
export declare function parseTsyPath(tag: string, path: string, aPrp?: readonly string[]): T_TSY_TO[];
export declare function easeToGsap(nm: string | undefined): string;
export declare function tsyName(tag: string, args: {
    [k: string]: string;
}): string;
