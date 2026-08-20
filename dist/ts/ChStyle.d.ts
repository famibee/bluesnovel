export type T_CH_STYLE = {
    wait: number;
    alpha: number;
    x: string;
    y: string;
    scale_x: number;
    scale_y: number;
    rotate: number;
    join: boolean;
    ease: string;
};
export declare const CH_IN_DEF: T_CH_STYLE;
export declare const CH_OUT_DEF: T_CH_STYLE;
export declare function parseChStyle(tag: string, args: {
    [k: string]: string;
}, joinDef: boolean): {
    name: string;
    sty: T_CH_STYLE;
};
export declare function chStylePos(v: string): string;
export declare function chStyleEase(ease: string): string;
export declare function chStyleAnim(sty: T_CH_STYLE): {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
};
