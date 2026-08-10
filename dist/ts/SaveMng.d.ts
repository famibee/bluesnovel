import type { T_H_Areas } from '../sn/Areas';
import type { T_VAL_D } from './VarStore';
export type T_MARK = {
    hSave: {
        [k: string]: T_VAL_D;
    };
    sPages: string;
    aIfStk: number[];
    hTxt?: {
        [nm: string]: string;
    };
    hTxtBk?: {
        [nm: string]: string;
    };
    json: {
        [k: string]: string;
    };
};
export type T_DATA4VARI = {
    sys: {
        [k: string]: T_VAL_D;
    };
    mark: {
        [place: string]: T_MARK;
    };
    kidoku: {
        [fn: string]: T_H_Areas;
    };
    storage: {
        [path: string]: string;
    };
};
export type T_DATA4VARI_TRANSPORT = {
    [K in keyof T_DATA4VARI]: T_DATA4VARI[K] | string;
};
export declare function decTransportField<T>(dec: (ext: string, tx: string) => Promise<string>, v: T | string | undefined): Promise<T | undefined>;
export type T_SaveStore = {
    readonly crypto: boolean;
    enc(tx: string): Promise<string>;
    dec(ext: string, tx: string): Promise<string>;
    storeLoad(ns: string): Promise<T_DATA4VARI_TRANSPORT | undefined>;
    storeFlush(ns: string, data: T_DATA4VARI_TRANSPORT): Promise<void>;
};
export declare class SaveMng {
    #private;
    private readonly sys;
    private readonly ns;
    get data(): T_DATA4VARI;
    constructor(sys: T_SaveStore, ns: string);
    load(): Promise<boolean>;
    flush(): void;
    flushed(): Promise<void>;
    getFile(path: string): string | undefined;
    putFile(path: string, dataUrl: string): void;
    getMark(place: number): T_MARK | undefined;
    setMark(place: number, mark: T_MARK): void;
    eraseMark(place: number): void;
    copyMark(from: number, to: number): void;
    bookmarkJson(): string;
    export(): Promise<void>;
    import(): Promise<T_DATA4VARI>;
}
