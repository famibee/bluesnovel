export type T_FLT = {
    css: string;
    enabled: boolean;
};
export declare function bldFilter(args: {
    [k: string]: string;
}): T_FLT;
export declare function styFilter(aFlt: T_FLT[]): string;
