export declare const A_FX_PRESET: readonly ["wave", "rgbShift", "snow", "rain"];
export type T_FX = {
    name: string;
    fx: string;
    glsl: string;
    time: number;
    speed: number;
    enabled: boolean;
    params: {
        [k: string]: number;
    };
};
export declare function bldFx(args: {
    [k: string]: string;
}): T_FX;
