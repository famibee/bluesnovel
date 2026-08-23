import { type T_LAY_IDX, type T_LAY_CMN } from './Lay';
import { type CSSProperties } from 'react';
export type T_FACE = {
    fn: string;
    dx: number;
    dy: number;
    blendmode: string;
};
export type T_FACE_SRC = T_FACE & {
    src: string;
    isSheet: boolean;
};
type T_GRPARG = T_LAY_CMN & {
    sty: CSSProperties;
    nm: string;
    fn: string;
    src: string;
    isSheet: boolean;
    isMovie: boolean;
    aFace: T_FACE_SRC[];
    getVideoVol: () => number;
    needClick2Play: () => boolean;
};
export type T_GRPLAY_DATA = T_LAY_IDX & {
    cls: 'grp';
    fn: string;
    src: string;
    isSheet: boolean;
    isMovie: boolean;
    aFace: T_FACE_SRC[];
};
export type T_GRPLAY = T_GRPLAY_DATA & T_LAY_CMN;
export default function GrpLayer({ cmn: { styChild, isDesignMode }, sty, nm, fn, src, isSheet, isMovie, aFace, getVideoVol, needClick2Play }: T_GRPARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
