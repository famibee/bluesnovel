import { type T_CH } from './Txt';
export type T_LOG_ENTRY = {
    text: string;
};
export declare function htmlOf(raw: string): string;
export declare function htmlOfCh(aCh: readonly T_CH[]): string;
export declare class Log {
    #private;
    private readonly maxLen;
    constructor(maxLen?: () => number);
    add(txt: string): void;
    pagebreak(): void;
    reset(text?: string): void;
    json(): string;
    playback(json: string): void;
}
