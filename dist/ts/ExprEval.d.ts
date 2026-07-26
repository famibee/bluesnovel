import type { T_VAL_D } from './VarStore';
export type T_VAR_GET = {
    get(name: string): T_VAL_D;
};
export declare class ExprEval {
    #private;
    private readonly val;
    constructor(val: T_VAR_GET, ce?: string);
    parse(s: string): T_VAL_D;
    evalBool(exp: string): boolean;
    getValAmpersand: (val: string) => string;
}
