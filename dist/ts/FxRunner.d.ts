import { type T_FX } from './Fx';
type T_DYN_SOURCE = (() => TexImageSource) & {
    dispose?: () => void;
};
type T_SOURCE = string | HTMLCanvasElement | HTMLImageElement | T_DYN_SOURCE;
type T_ARG = {
    canvas: HTMLCanvasElement;
    source: T_SOURCE;
    aFx: T_FX[];
    active: boolean;
};
export type T_FX_HANDLE = {
    update(aFx: T_FX[], active: boolean): void;
    dispose(): void;
};
export declare function runFx(o: T_ARG): Promise<T_FX_HANDLE>;
export {};
