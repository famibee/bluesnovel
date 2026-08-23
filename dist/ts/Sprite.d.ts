export type T_FRAME = {
    x: number;
    y: number;
    w: number;
    h: number;
    ox: number;
    oy: number;
};
export type T_SHEET = {
    img: string;
    boxW: number;
    boxH: number;
    frames: T_FRAME[];
    cnt: number;
    sec: number;
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
export declare function aniSpriteCss({ img, boxW, boxH, frames, cnt, sec }: T_SHEET, cls: string): string;
export {};
