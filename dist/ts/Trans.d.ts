export declare const VAGUE_DEF = 0.04;
export type T_RULE_MASK = {
    slope: number;
    intercept: number;
};
export declare function ruleMaskFunc(tick: number, vague?: number): T_RULE_MASK;
