import type { T_SEARCHPATH } from '../sn/ConfigBase';
export type T_FRM_STY = {
    visible?: boolean;
    alpha?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    scale_x?: number;
    scale_y?: number;
    rotate?: number;
    b_color?: string;
};
export type T_FRM_ORDER = {
    mode: 'float' | 'index' | 'dive';
    index?: number;
};
export type T_FRM_VALS = {
    [name: string]: string | number | boolean;
};
export declare class FrameMng {
    #private;
    private readonly searchPath;
    constructor(searchPath: T_SEARCHPATH);
    attachBox(el: HTMLElement): void;
    getDisabled(id: string): boolean;
    getSty(id: string): T_FRM_STY;
    add(id: string, src: string, sty: T_FRM_STY): Promise<T_FRM_VALS>;
    frame(id: string, sty: T_FRM_STY, order?: T_FRM_ORDER, disabled?: boolean): T_FRM_VALS;
    set(id: string, var_name: string, text: string): void;
    get(id: string, var_name: string, fnc: boolean): unknown;
    elms(rawKey: string): {
        id: string;
        sel: string;
        aEl: HTMLElement[];
    };
    resvDom(rawKey: string, key: string, del: boolean, needErr: boolean, fire: (el: HTMLElement) => void): HTMLElement[];
    resolveDom(rawKey: string, needErr: boolean): HTMLElement[];
}
