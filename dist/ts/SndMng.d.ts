import { type T_SND_OPT } from './SndBuf';
export declare class SndMng {
    #private;
    private readonly trace;
    private readonly fetch;
    private readonly decAB;
    constructor(trace: (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void, fetch: (url: string, init?: RequestInit) => Promise<Response>, decAB: (ab: ArrayBuffer) => Promise<ArrayBuffer>);
    unlock(): void;
    needClick2Play(): boolean;
    setGlobalVol(v: number): void;
    codecs(): string;
    play(buf: string, src: string, opt: T_SND_OPT, onStop?: (buf: string) => void): Promise<void>;
    stop(buf: string): void;
    stopAll(): void;
    bufs(): string[];
    xchgBuf(buf: string, buf2: string): void;
    setVol(buf: string, v: number): void;
    gainNode(buf: string): GainNode | undefined;
    waitEnd(buf: string, fnc: () => void): boolean;
    cancelWaitEnd(buf: string): void;
}
