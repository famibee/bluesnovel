import { appMain_cmn } from './appMain_cmn';
import type { SAVE_WIN_INF } from './preload';
import { BrowserWindow } from 'electron';
export declare class appMain extends appMain_cmn {
    #private;
    static initRenderer(preload: string, version: string): BrowserWindow;
    protected sendShutdown(): void;
    protected sendSaveWinInf(arg: SAVE_WIN_INF): void;
}
