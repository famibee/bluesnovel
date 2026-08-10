export type T_FLT = {
    css: string;
    enabled: boolean;
    blendmode?: string;
    mat?: number[];
    blurXY?: readonly [number, number];
};
export declare function fltId(mat: readonly number[]): string;
export declare const fltValues: (mat: readonly number[]) => string;
export declare function blurId([x, y]: readonly [number, number]): string;
export declare const blurValues: ([x, y]: readonly [number, number]) => string;
export declare function bldFilter(args: {
    [k: string]: string;
}): T_FLT;
export declare function matsOf(aFlt: readonly T_FLT[]): number[][];
export declare function blursOf(aFlt: readonly T_FLT[]): (readonly [number, number])[];
export declare function blendmodeOf(aFlt: readonly T_FLT[]): string | undefined;
export declare function styFilter(aFlt: T_FLT[]): string;
