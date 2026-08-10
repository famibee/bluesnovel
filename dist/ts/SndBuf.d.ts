export declare const MAX_END_MS = 999000;
export type T_SND_OPT = {
    loop: boolean;
    volume: number;
    speed: number;
    pan: number;
    start_ms: number;
    end_ms: number;
    ret_ms: number;
};
export declare class SndBuf {
    #private;
    private readonly ctx;
    readonly src: string;
    private readonly opt;
    buf: string;
    constructor(ctx: AudioContext, dst: AudioNode, buf: string, src: string, opt: T_SND_OPT);
    readonly gn: GainNode;
    get loop(): boolean;
    get destroyed(): boolean;
    set onEnd(fnc: (() => void) | undefined);
    start(ab: AudioBuffer, needClick2Play: boolean): void;
    stop(): void;
    get volume(): number;
    set volume(v: number);
}
