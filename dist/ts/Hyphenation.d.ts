export declare const DEF_KINSOKU_SOL = "\u3001\u3002\uFF0C\uFF0E\uFF09\uFF3D\uFF5D\u3009\u300D\u300F\u3011\u3015\u201D\u301F\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\uFF01\uFF1F!?\u203C\u2049\u30FB\u30FC\u309D\u309E\u30FD\u30FE\u3005";
export declare const DEF_KINSOKU_EOL = "\uFF3B\uFF08\uFF5B\u3008\u300C\u300E\u3010\u3014\u201C\u301D";
export declare const DEF_KINSOKU_DNS = "\u2500\u2025\u2026";
export declare const DEF_KINSOKU_BURA = "\u3001\u3002\uFF0C\uFF0E\uFF09\uFF3D\uFF5D\u3009\u300D\u300F\u3011\u3015\u201D\u301F\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\uFF01\uFF1F!?\u203C\u2049\u30FB\u30FC\u309D\u309E\u30FD\u30FE\u3005";
export declare const DEF_KINSOKU: {
    readonly sol: "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々";
    readonly eol: "［（｛〈「『【〔“〝";
    readonly dns: "─‥…";
    readonly bura: "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々";
};
export type T_KINSOKU = {
    sol?: string | undefined;
    eol?: string | undefined;
    dns?: string | undefined;
    bura?: string | undefined;
};
export type T_KIN_CH = {
    ch: string;
    rt?: true;
    afterBr?: true;
};
export declare function chkKinsoku(eol: string, dns: string, bura: string): void;
export declare class Kinsoku {
    #private;
    constructor(k?: T_KINSOKU);
    i2pi(a: readonly T_KIN_CH[], i: number): number;
    hyphAlg(a: readonly T_KIN_CH[], p_i: number, p_ch: string, ii: number, ch: string): {
        cont: boolean;
        ins: number;
    };
    hyphAlgBura(a: readonly T_KIN_CH[], p_i: number, p_ch: string, i: number): {
        cont: boolean;
        ins: number;
    };
    scan(a: readonly T_KIN_CH[], xy: readonly number[], bura: boolean, from: number): {
        ins: number;
        resumeAt: number;
    } | null;
}
