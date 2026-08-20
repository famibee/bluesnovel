import type { ScriptMng } from './ScriptMng';
export declare function axisToKey(x: number, y: number, zone?: number): string;
export declare function keyEventInit(key: string): KeyboardEventInit;
export declare class GamepadMng {
    #private;
    constructor(scrMng: ScriptMng);
    start(): void;
    stop(): void;
}
