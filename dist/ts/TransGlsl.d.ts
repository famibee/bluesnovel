export type T_GLSL_TRANS = {
    stageEl: HTMLElement;
    holder: HTMLElement;
    glslSrc: string;
    time: number;
    vague: number;
    ruleSrc?: string;
    t0: number;
    backSrcs: string[];
};
export declare function runGlslTrans(o: T_GLSL_TRANS): Promise<() => void>;
