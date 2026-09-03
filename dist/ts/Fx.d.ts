export declare const A_FX_PRESET: readonly ["wave", "rgbShift", "snow", "rain", "fireworks"];
export declare const A_FX_PARAM: readonly ["amp", "freq", "shift", "p1", "p2", "p3", "p4"];
export type T_FX = {
    name: string;
    fx: string;
    time: number;
    speed: number;
    enabled: boolean;
    params: {
        [k: string]: number;
    };
    color?: readonly [number, number, number];
    pad?: number;
    padB?: number;
};
export type T_DEF_FX_META = {
    duration?: number;
    pad?: number;
    padB?: number;
};
export declare function bldFx(args: {
    [k: string]: string;
}, hDefFx?: {
    readonly [name: string]: number | T_DEF_FX_META;
}): T_FX;
