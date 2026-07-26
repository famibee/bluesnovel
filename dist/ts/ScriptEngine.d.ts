import { type T_VAL_D } from './VarStore';
import { Script } from './Script';
import { type T_H_Areas } from '../sn/Areas';
import { type T_TSY_TO } from './Tsy';
import type { T_FRM_ORDER, T_FRM_STY } from './FrameMng';
import { type T_FLT } from './Filter';
import type { T_BTN_STY } from '../components/TxtLayer';
export type T_FACE = {
    fn: string;
    dx: number;
    dy: number;
    blendmode: string;
};
export type T_PAGE = 'fore' | 'back';
export type T_PAGE_BOTH = T_PAGE | 'both';
export type T_LAY_STY_ARG = {
    visible?: boolean;
    alpha?: number;
    left?: number;
    top?: number;
    align_x?: 'center' | 'right';
    align_y?: 'middle' | 'bottom';
    s_right?: number;
    s_bottom?: number;
    rotation?: number;
    scale_x?: number;
    scale_y?: number;
    pivot_x?: number;
    pivot_y?: number;
    blendmode?: string;
    b_color?: number;
    style?: string;
    ffs?: string;
    noffs?: string;
    bura?: boolean;
};
export type T_ENGINE_ACTION = {
    t: 'addLay';
    cls: 'grp' | 'txt';
    nm: string;
} | {
    t: 'chgPic';
    nm: string;
    page: T_PAGE;
    fn: string;
    aFace: T_FACE[];
} | {
    t: 'chgBAlpha';
    nm: string;
    page: T_PAGE;
    b_alpha?: number;
    isFixed?: boolean;
} | {
    t: 'chgBPic';
    nm: string;
    page: T_PAGE;
    fn: string;
} | {
    t: 'trans';
    aLayNm: string[] | null;
    time: number;
    rule?: string;
    vague?: number;
} | {
    t: 'waitTrans';
    canskip: boolean;
} | {
    t: 'finishTrans';
} | {
    t: 'quake';
    msec: number;
    hmax: number;
    vmax: number;
} | {
    t: 'stopQuake';
} | {
    t: 'waitQuake';
    canskip: boolean;
} | {
    t: 'chgStr';
    nm: string;
    page: T_PAGE_BOTH;
    str: string;
} | {
    t: 'clearBtn';
    nm: string;
    page: T_PAGE_BOTH;
} | {
    t: 'addBtn';
    layerNm: string;
    page: T_PAGE;
    nm?: string;
    text: string;
    label: string;
    call?: boolean;
    fn?: string;
    sty?: T_BTN_STY;
} | {
    t: 'chgLay';
    nm: string;
    page: T_PAGE;
    sty: T_LAY_STY_ARG;
} | {
    t: 'clearLay';
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
} | {
    t: 'moveLay';
    nm: string;
    mode: 'float' | 'index' | 'dive';
    index?: number;
    dive?: string;
} | {
    t: 'addFilter';
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
    flt: T_FLT;
    replace: boolean;
} | {
    t: 'clearFilter';
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
} | {
    t: 'enableFilter';
    aLayNm: string[] | null;
    page: T_PAGE_BOTH;
    index: number;
    enabled: boolean;
} | {
    t: 'clearPageLog';
} | {
    t: 'title';
    text: string;
} | {
    t: 'toggleFullScr';
} | {
    t: 'navigateTo';
    url: string;
} | {
    t: 'loadPlugin';
    fn: string;
    join: boolean;
} | {
    t: 'snapshot';
    fn: string;
    aLayNm: string[] | null;
    page: T_PAGE;
    width: number;
    height: number;
    b_color?: number;
} | {
    t: 'recordPlace';
} | {
    t: 'save';
    place: number;
    json: {
        [k: string]: string;
    };
} | {
    t: 'load';
    place: number;
    fn: string;
    label: string;
} | {
    t: 'reloadScript';
} | {
    t: 'copyBookmark';
    from: number;
    to: number;
} | {
    t: 'eraseBookmark';
    place: number;
} | {
    t: 'exportData';
} | {
    t: 'importData';
} | {
    t: 'fullScrKey';
    key: string;
} | {
    t: 'dumpLay';
    aLayNm: string[] | null;
} | {
    t: 'addFrame';
    id: string;
    src: string;
    sty: T_FRM_STY;
} | {
    t: 'frame';
    id: string;
    sty: T_FRM_STY;
    order?: T_FRM_ORDER;
    disabled?: boolean;
} | {
    t: 'setFrame';
    id: string;
    var_name: string;
    text: string;
} | {
    t: 'letFrame';
    id: string;
    var_name: string;
    fnc: boolean;
} | {
    t: 'resvDomEvent';
    rawKey: string;
    key: string;
    del: boolean;
    needErr: boolean;
} | {
    t: 'setFocus';
    mode: 'add' | 'del' | 'null' | 'next' | 'prev';
    rawKey?: string;
    needErr?: boolean;
} | {
    t: 'trace';
    text: string;
} | {
    t: 'stop';
    kind: T_STOP_KIND;
    key: string;
    nm: string;
    resume?: T_RESUME;
} | {
    t: 'enableEvent';
    nm: string;
    enabled: boolean;
} | {
    t: 'wait';
    msec: number;
    canskip: boolean;
} | {
    t: 'tsy';
    tw_nm: string;
    nm: string;
    page: T_PAGE;
    msec: number;
    delay: number;
    ease: string;
    repeat: number;
    yoyo: boolean;
    hTo: T_TSY_TO;
    aPath?: T_TSY_TO[];
    chain?: string;
} | {
    t: 'tsyFrame';
    tw_nm: string;
    id: string;
    msec: number;
    delay: number;
    ease: string;
    repeat: number;
    yoyo: boolean;
    hTo: T_TSY_TO;
    aPath?: T_TSY_TO[];
    chain?: string;
} | {
    t: 'waitTsy';
    tw_nm: string;
    canskip: boolean;
} | {
    t: 'stopTsy';
    tw_nm: string;
} | {
    t: 'pauseTsy';
    tw_nm: string;
    paused: boolean;
} | {
    t: 'loadScript';
    fn: string;
    label: string;
    idx: number;
};
export type T_TAG_PARSED = {
    name: string;
    args: {
        [k: string]: string;
    };
};
export type T_EVENT_RSV = {
    fn: string;
    label: string;
    call: boolean;
    arg: string;
    url?: string;
};
export type T_RESUME = {
    mode: 'auto' | 'skip';
    msec: number;
};
export type T_STOP_KIND = 'l' | 'p' | 's' | 'waitclick';
export declare class ScriptEngine {
    #private;
    static parseTag(token: string): T_TAG_PARSED;
    static argPage(args: {
        [k: string]: string;
    }, def: T_PAGE): T_PAGE;
    static readonly REG_NG4MAC_NM: RegExp;
    static readonly RESERVED_TAGS: Set<string>;
    constructor(fn: string | Script, src?: string);
    setFullScr(b: boolean): void;
    setKeyDown(key: string, down: boolean): void;
    clearKeyDown(): void;
    switchScript(scr: Script, label?: string, idx?: number): void;
    getVal(name: string): T_VAL_D;
    setValNochk(name: string, v: T_VAL_D): void;
    defBuiltin(name: string, fnc: () => T_VAL_D): void;
    get fn(): string;
    get idx(): number;
    get atEnd(): boolean;
    jumpToLabel(label: string): void;
    callToLabel(label: string): void;
    callToScript(scr: Script, label?: string): void;
    nowScrIdx(): {
        fn: string;
        idx: number;
    };
    recordPlace(): void;
    nowMarkPart(): {
        hSave: {
            [k: string]: T_VAL_D;
        };
        aIfStk: number[];
    };
    restoreMarkPart(o: {
        hSave: {
            [k: string]: T_VAL_D;
        };
        aIfStk: number[];
    }): void;
    cloneSys(): {
        [k: string]: T_VAL_D;
    };
    setSys(h: {
        [k: string]: T_VAL_D;
    }): void;
    get isKidoku(): boolean;
    getKidoku(): {
        [fn: string]: T_H_Areas;
    };
    setKidoku(h: {
        [fn: string]: T_H_Areas;
    }): void;
    clearKidoku(): void;
    get autoEnabled(): boolean;
    get skipEnabled(): boolean;
    get skipAll(): boolean;
    get tagLEnabled(): boolean;
    cancelAutoSkip(): void;
    get isNextKidoku(): boolean;
    getEvent(key: string): T_EVENT_RSV | undefined;
    clearEvent(global?: boolean): void;
    beginEvent(key: string): T_EVENT_RSV | undefined;
    step(): T_ENGINE_ACTION[];
}
