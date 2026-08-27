import type { TArg } from './Grammar';
export type T_RecordPlayBack_lay = {
    name: string;
    idx: number;
    [key: string]: any;
};
export declare class Layer {
    layname: string;
    protected name_: string;
    set name(nm: string);
    get name(): string;
    readonly ctn: HTMLDivElement;
    destroy(): void;
    lay(_hArg: TArg): boolean;
    clearLay(_hArg: TArg): void;
    record(): T_RecordPlayBack_lay;
    playback(_hLay: T_RecordPlayBack_lay, _aPrm: Promise<void>[]): void;
    copy(fromLayer: Layer, aPrm: Promise<void>[]): void;
    dump(): string;
}
