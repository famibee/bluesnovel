import type { SysBase } from '../sn/SysBase';
import type { ScriptMng } from '../ts/ScriptMng';
import type { Root } from 'react-dom/client';
export type T_ARG = {
    heStage: HTMLElement;
    sys: SysBase;
    scrMng: ScriptMng;
};
export declare function initMain(root: Root, arg: T_ARG, inited: () => void): void;
export declare function Main({ arg, inited }: {
    arg: T_ARG;
    inited: () => void;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function modKeyName(e: MouseEvent): string;
export declare const setDesignMode: (b: boolean) => boolean;
export declare function suppressClick(): void;
