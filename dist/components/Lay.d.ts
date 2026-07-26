import type { SysBase } from '../sn/SysBase';
import { type T_FLT } from '../ts/Filter';
import type { T_GRPLAY_DATA } from './GrpLayer';
import type { T_TXTLAY_DATA } from './TxtLayer';
import type { CSSProperties } from 'react';
import type { SerializedStyles } from '@emotion/react';
export type T_LAY_STY = {
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
    aFlt?: T_FLT[];
};
export declare const BTN_DEF_W = 100;
export declare const BTN_DEF_H = 30;
export declare const A_LAY_STY_KEY: readonly ["visible", "alpha", "left", "top", "align_x", "align_y", "s_right", "s_bottom", "rotation", "scale_x", "scale_y", "pivot_x", "pivot_y", "blendmode", "aFlt"];
export type T_LAY_IDX = T_LAY_STY & {
    cls: 'grp' | 'txt';
    nm: string;
};
export declare function styLay(l: T_LAY_STY): CSSProperties;
export type T_LAY_CMN = {
    cmn: {
        sys: SysBase;
        styChild: SerializedStyles;
        isDesignMode: boolean;
        sty4Moveable: any;
        visible?: boolean;
    };
};
export type T_LAY = T_GRPLAY_DATA | T_TXTLAY_DATA;
export declare const noticeDrag: () => void;
export declare const clearDrag: () => void;
export declare const isDragging: () => boolean;
