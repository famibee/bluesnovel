import type { T_LAY_CMN } from './Lay';
import type { CSSProperties } from 'react';
export type T_PLGARG = T_LAY_CMN & {
    sty: CSSProperties;
    nm: string;
    attach: (el: HTMLDivElement | null) => void;
};
export default function PlgLayer({ cmn: { styChild, isDesignMode }, sty, nm, attach }: T_PLGARG): import("@emotion/react/jsx-runtime").JSX.Element;
