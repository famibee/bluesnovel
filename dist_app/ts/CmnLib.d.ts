export declare function int(o: any): number;
export declare function uint(o: any): number;
export declare function getDateStr(spl_dd?: string, spl_dt?: string, spl_tt?: string, spl_ms?: string): string;
export declare function initStyle(): void;
export declare function addStyle(style: string): void;
export declare function argChk_Num(hash: any, name: string, def: number): number;
export declare function argChk_Boolean(hash: any, name: string, def: boolean): boolean;
export declare function getFn(p: string): string;
export declare function getExt(p: string): string | undefined;
export declare class CmnLib {
    static stageW: number;
    static stageH: number;
    static debugLog: boolean;
    static readonly isSafari: boolean;
    static readonly isFirefox: boolean;
    static readonly isMac: boolean;
    static readonly isWin: boolean;
    static readonly isMobile: boolean;
    static hDip: {
        [name: string]: string;
    };
    static isDbg: boolean;
    static isPackaged: boolean;
    static isDarkMode: boolean;
    static cc4ColorName: CanvasRenderingContext2D;
}
//# sourceMappingURL=CmnLib.d.ts.map