import type { SysBase } from '../sn/SysBase';
import type { T_HTag } from '../sn/Grammar';
import type { T_INIT_FNCS } from '../store/store';
import { type T_PAGE_TO } from './PageLog';
type T_TRACE = (txt: string, lvl?: 'D' | 'W' | 'F' | 'E' | 'I' | 'ET') => void;
export declare class ScriptMng {
    #private;
    private readonly sys;
    constructor(sys: SysBase);
    attachTsx(trgNext: () => void, fncs: T_INIT_FNCS, hTag: T_HTag): void;
    $trgNext: () => void;
    $fncs: T_INIT_FNCS;
    load(fn: string): void;
    page(to: T_PAGE_TO): void;
    go(): void;
    navigateTo(url: string): void;
    jumpToLabelAndGo(label: string, call: boolean, fn?: string, arg?: string): void;
    attachFrameBox(el: HTMLElement): void;
    attachStageBox(el: HTMLElement): void;
    fireFullScrKey(key: string): boolean;
    setFullScr(b: boolean): void;
    setKeyDown(key: string, down: boolean): void;
    clearKeyDown(): void;
    fireEvent(key: string): boolean;
    cancelAuto(): void;
    readonly myTrace: T_TRACE;
}
export {};
