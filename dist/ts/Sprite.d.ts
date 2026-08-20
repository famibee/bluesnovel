export type T_SHEET = {
    img: string;
    fw: number;
    fh: number;
    cols: number;
    rows: number;
    cnt: number;
    sec: number;
    isCol: boolean;
};
export declare function parseSheet(json: unknown, img: string): T_SHEET | undefined;
declare let snFetch: (url: string, init?: RequestInit) => Promise<Response>;
declare let snDec: (ext: string, tx: string) => Promise<string>;
declare let snDecAB: (ab: ArrayBuffer) => Promise<ArrayBuffer>;
export declare function setFetch(f: typeof snFetch): void;
export declare function setDecFncs(dec: typeof snDec, decAB: typeof snDecAB, crypto: boolean): void;
export declare function loadSheet(jsonSrc: string): Promise<T_SHEET | undefined>;
export declare function sheetImgSrc(jsonSrc: string, json: unknown): string;
export declare function setNatSize(src: string, w: number, h: number): void;
export declare function getNatSize(src: string): {
    w: number;
    h: number;
} | undefined;
export declare function aniSpriteClass(sh: T_SHEET, doc?: Document): string;
export declare function aniSpriteCss({ img, fw, fh, cols, rows, cnt, sec, isCol }: T_SHEET, cls: string): string;
export {};
