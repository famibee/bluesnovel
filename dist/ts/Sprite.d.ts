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
export declare function loadSheet(jsonSrc: string): Promise<T_SHEET | undefined>;
export declare function sheetImgSrc(jsonSrc: string, json: unknown): string;
export declare function aniSpriteClass(sh: T_SHEET, doc?: Document): string;
export declare function aniSpriteCss({ img, fw, fh, cols, rows, sec, isCol }: T_SHEET, cls: string): string;
