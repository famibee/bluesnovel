export type T_VAL = string | number | boolean | null;
export type T_VAL_D = T_VAL | undefined;
export declare const A_NS: readonly ["tmp", "game", "sys", "mp"];
export type T_NS = typeof A_NS[number];
export declare const A_CAST: readonly ["num", "int", "uint", "bool", "str"];
export type T_CAST = typeof A_CAST[number] | '';
export declare class VarStore {
    #private;
    constructor();
    defBuiltin(name: string, fnc: () => T_VAL_D): void;
    defSetTrigger(name: string, fnc: (v: T_VAL_D) => void): void;
    defSetTriggerSoundVol(fnc: (buf: string, v: T_VAL_D) => void): void;
    static readonly REG_NAME: RegExp;
    static parseName(name: string): {
        ns: T_NS;
        key: string;
        atStr: boolean;
    };
    get(name: string, def?: T_VAL_D, touch?: boolean): T_VAL_D;
    static readonly REG_NUMERICLITERAL: RegExp;
    static castAuto(val: T_VAL_D): T_VAL_D;
    set(name: string, val: T_VAL_D, cast?: T_CAST): void;
    setNochk(name: string, val: T_VAL_D, cast?: T_CAST): void;
    static castTo(val: T_VAL_D, cast: T_CAST): T_VAL_D;
    cloneMp(): {
        [key: string]: T_VAL_D;
    };
    setMp(h: {
        [key: string]: T_VAL_D;
    }): void;
    cloneNs(ns: T_NS): {
        [key: string]: T_VAL_D;
    };
    setNs(ns: T_NS, h: {
        [key: string]: T_VAL_D;
    }): void;
    dump(): {
        [ns: string]: {
            [key: string]: T_VAL_D;
        };
    };
    clearGame(): void;
    clearSys(): void;
}
