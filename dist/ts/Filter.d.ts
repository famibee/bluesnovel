export type T_FLT = {
    css: string;
    enabled: boolean;
    mat?: number[];
};
export declare function fltId(mat: readonly number[]): string;
export declare const fltValues: (mat: readonly number[]) => string;
export declare function bldFilter(args: {
    [k: string]: string;
}): T_FLT;
export declare function matsOf(aFlt: readonly T_FLT[]): number[][];
export declare function styFilter(aFlt: T_FLT[]): string;
