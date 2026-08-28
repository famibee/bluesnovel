import { type T_LAY, type T_LAY_STY } from '../components/Lay';
import type { T_FLT } from '../ts/Filter';
import type { T_FX } from '../ts/Fx';
import type { T_FACE_SRC } from '../components/GrpLayer';
import type { T_BTN_STY } from '../components/TxtLayer';
import type { T_CH, T_R_ALIGN } from '../ts/Txt';
import { type T_CH_STYLE } from '../ts/ChStyle';
type T_STATE = {
    txt: string;
    addTxt: (t: string) => void;
    clearTxt: () => void;
    aPage: [T_LAY[], T_LAY[]];
    foreIdx: 0 | 1;
    replace: (arg: string) => void;
    addLayer: (arg: T_LAY) => void;
    chgPic: (arg: T_CHGPIC) => void;
    chgBAlpha: (arg: T_CHGBALPHA) => void;
    chgBPic: (arg: T_CHGBPIC) => void;
    chgBackClear: (arg: T_CHGBACKCLEAR) => void;
    chgLay: (arg: T_CHGLAY) => void;
    getLaySty: (nm: string, page: T_PAGE) => T_LAY_STY;
    getForeIdx: () => 0 | 1;
    getPages: () => {
        fore: T_LAY[];
        back: T_LAY[];
    };
    getPagesJson: () => string;
    enableEvent: (arg: T_ENABLEEVENT) => void;
    clearLay: (arg: T_CLEARLAY) => void;
    clearTxtLay: (arg: T_CLEARTXTLAY) => void;
    moveLay: (arg: T_MOVELAY) => void;
    chgFilter: (arg: T_CHGFILTER) => void;
    chgFx: (arg: T_CHGFX) => void;
    chgStr: (arg: T_CHGSTR) => void;
    addBtn: (arg: T_ADDBTN) => void;
    hChIn: {
        [nm: string]: T_CH_STYLE;
    };
    hChOut: {
        [nm: string]: T_CH_STYLE;
    };
    defChStyle: (arg: T_DEFCHSTYLE) => void;
    chWait: number;
    setChWait: (v: number) => void;
    autowc: T_AUTOWC;
    setAutowc: (a: T_AUTOWC) => void;
    trans: T_TRANS;
    startTrans: (arg: T_STARTTRANS) => void;
    finishTrans: () => void;
    quake: T_QUAKE;
    startQuake: (arg: T_STARTQUAKE) => void;
    finishQuake: () => void;
    title: string;
    addTitle: (t: string) => void;
    fullScr: boolean;
    setFullScr: (b: boolean) => void;
    toggleFullScr: () => void;
    isReadBack: boolean;
    setReadBack: (b: boolean) => void;
    styPaging: string;
    setStyPaging: (s: string) => void;
    isTyping: boolean;
    setIsTyping: (b: boolean) => void;
    skipReq: number;
    requestSkip: () => void;
    skipping: boolean;
    setSkipping: (b: boolean) => void;
    wait: T_WAIT;
    setWait: (w: T_WAIT) => void;
    backAlpha: number;
    setBackAlpha: (v: number) => void;
    btnFont: string;
    setBtnFont: (v: string) => void;
};
export type T_WAIT = {
    nm: string;
    kind: 'l' | 'p' | 'waitclick';
    src?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
} | null;
export type T_PAGE = 'fore' | 'back';
export type T_PAGE_BOTH = T_PAGE | 'both';
export type T_TRANS = {
    seq: number;
    aLayNm: string[] | null;
    time: number;
    ruleSrc?: string;
    vague?: number;
    glslSrc?: string;
} | null;
export type T_STARTTRANS = {
    aLayNm: string[] | null;
    time: number;
    ruleSrc?: string;
    vague?: number;
    glslSrc?: string;
};
export type T_QUAKE = {
    seq: number;
    hmax: number;
    vmax: number;
} | null;
export type T_STARTQUAKE = {
    hmax: number;
    vmax: number;
};
export type T_CHGPIC = {
    nm: string;
    page: T_PAGE;
    fn: string;
    src: string;
    isSheet: boolean;
    isMovie: boolean;
    aFace?: T_FACE_SRC[];
};
export type T_CHGBALPHA = {
    nm: string;
    page: T_PAGE;
    b_alpha?: number;
    isFixed?: boolean;
};
export type T_CHGBPIC = {
    nm: string;
    page: T_PAGE;
    fn: string;
    src: string;
};
export type T_CHGBACKCLEAR = {
    nm: string;
    page: T_PAGE;
};
export type T_LAY_STY_ARG = Partial<T_LAY_STY> & {
    b_color?: number;
    style?: string;
    pl?: number;
    pr?: number;
    pt?: number;
    pb?: number;
    ffs?: string;
    noffs?: string;
    bura?: boolean;
    kinsoku_sol?: string;
    kinsoku_eol?: string;
    kinsoku_dns?: string;
    kinsoku_bura?: string;
    r_align?: T_R_ALIGN;
    in_style?: string;
    out_style?: string;
};
export type T_CHGLAY = {
    nm: string;
    page: T_PAGE;
    sty: T_LAY_STY_ARG;
};
export type T_AUTOWC = {
    enabled: boolean;
    h: {
        [ch: string]: number;
    };
};
export type T_DEFCHSTYLE = {
    kind: 'in' | 'out';
    nm: string;
    sty: T_CH_STYLE;
};
export type T_ENABLEEVENT = {
    nm: string;
    enabled: boolean;
};
export type T_CLEARLAY = {
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
};
export type T_CLEARTXTLAY = {
    nm: string;
    page: T_PAGE_BOTH;
    clearFilter: boolean;
};
export type T_CHGFILTER = {
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
    mode: 'add' | 'replace' | 'clear' | 'enable';
    flt?: T_FLT;
    index?: number;
    enabled?: boolean;
};
export type T_CHGFX = {
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
    mode: 'add' | 'clear' | 'enable';
    fx?: T_FX;
    names?: string[] | null;
    index?: number;
    enabled?: boolean;
};
export type T_MOVELAY = {
    nm: string;
    mode: 'float' | 'index' | 'dive';
    index?: number;
    dive?: string;
};
export type T_CHGSTR = {
    nm: string;
    page: T_PAGE_BOTH;
    str: string;
    aCh: T_CH[];
};
export type T_ADDBTN = {
    layerNm: string;
    page: T_PAGE;
    nm?: string;
    text: string;
    label: string;
    call?: boolean;
    fn?: string;
    arg?: string;
    sty?: T_BTN_STY;
};
export declare const DEF_BTN_FONT = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '\u6E38\u30B4\u30B7\u30C3\u30AF Medium', meiryo, sans-serif";
export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer' | 'chgPic' | 'chgBAlpha' | 'chgBPic' | 'chgBackClear' | 'setBackAlpha' | 'setBtnFont' | 'chgStr' | 'chgLay' | 'defChStyle' | 'setChWait' | 'setAutowc' | 'getLaySty' | 'getForeIdx' | 'getPages' | 'getPagesJson' | 'replace' | 'clearLay' | 'clearTxtLay' | 'moveLay' | 'chgFilter' | 'chgFx' | 'enableEvent' | 'addBtn' | 'addTitle' | 'toggleFullScr' | 'setWait' | 'requestSkip' | 'setSkipping' | 'startTrans' | 'finishTrans' | 'startQuake' | 'finishQuake' | 'setReadBack' | 'setStyPaging'> & {
    isTyping: () => boolean;
}>;
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<T_STATE>>;
export declare function resetStore(): void;
export {};
