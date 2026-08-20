export declare class Tw {
    #private;
    constructor(target: any);
    to(hTo: any, time_ms: number): this;
    onUpdate(fn: (d: any) => void): this;
    onComplete(fn: () => void): this;
    easing(fn: (k: number) => number): this;
    delay(ms: number): this;
    repeat(n: number): this;
    yoyo(b: boolean): this;
    chain(next: Tw): this;
    onStart(fn: () => void): this;
    start(): this;
    kill(): void;
    pause(): this;
    resume(): this;
}
