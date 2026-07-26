import type { T_H_Areas } from '../sn/Areas';
import type { T_VAL_D } from './VarStore';
export type T_MARK = {
    hSave: {
        [k: string]: T_VAL_D;
    };
    sPages: string;
    aIfStk: number[];
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
};
export declare class SaveMng {
    #private;
    private readonly ns;
    get data(): T_DATA4VARI;
    constructor(ns: string);
    load(): boolean;
    flush(): void;
    getMark(place: number): T_MARK | undefined;
    setMark(place: number, mark: T_MARK): void;
    eraseMark(place: number): void;
    copyMark(from: number, to: number): void;
    bookmarkJson(): string;
    export(): void;
    import(): Promise<T_DATA4VARI>;
}
