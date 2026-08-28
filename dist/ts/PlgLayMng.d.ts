import type { T_RecordPlayBack_lay } from '../sn/Layer';
import type { T_PAGE_BOTH } from '../store/store';
export type T_RecordPlayBack_plgLay = {
    [nm: string]: {
        cls: string;
        fore: T_RecordPlayBack_lay;
        back: T_RecordPlayBack_lay;
    };
};
export declare class PlgLayMng {
    #private;
    setPageState(foreIdx: 0 | 1, transActive: boolean): void;
    add(nm: string, cls: string): void;
    lay(nm: string, pageIdx: 0 | 1, hArg: {
        [k: string]: string;
    }): boolean;
    clearLay(aLayNm: string[] | null, page: T_PAGE_BOTH, foreIdx: 0 | 1): void;
    attachBox(nm: string, pageIdx: 0 | 1, el: HTMLElement | null): void;
    dump(nm: string, pageIdx: 0 | 1): string;
    record(): T_RecordPlayBack_plgLay;
    playback(h: T_RecordPlayBack_plgLay | undefined, aPrm: Promise<void>[]): void;
    finishTrans(aLayNm: string[] | null, oldForeIdx: 0 | 1, aPrm: Promise<void>[]): void;
    destroy(): void;
}
