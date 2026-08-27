import { type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';
export type T_LAYER_PROPS = {
    styChild: SerializedStyles;
    isDesignMode: boolean;
    nm: string;
    sty: CSSProperties;
    keepRatio?: boolean;
    onMouseDown?: (e: MouseEvent) => void;
    children: ReactNode;
};
export default function Layer({ styChild, isDesignMode, nm, sty, keepRatio, onMouseDown, children }: T_LAYER_PROPS): import("@emotion/react/jsx-runtime").JSX.Element;
