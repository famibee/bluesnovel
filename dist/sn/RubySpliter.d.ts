import type { TArg } from './Grammar';
export type T_PutCh = (ch: string, ruby: string) => void;
export type IAutoPage = (idx: number, str: string) => void;
export declare class RubySpliter {
    #private;
    static setting(hArg: TArg): void;
    static getSesame(): string;
    static destroy(): void;
    init(putCh: T_PutCh): void;
    static setEscape(ce: string): void;
    putTxt(text: string): void;
    putTxtRb(text: string, ruby: string): void;
}
