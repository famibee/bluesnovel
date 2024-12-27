import { SysBase } from '../ts/SysBase';
import { ScriptMng } from '../ts/ScriptMng';
import { Root } from 'react-dom/client';
export type T_ARG = {
    heStage: HTMLElement;
    sys: SysBase;
    scrMng: ScriptMng;
};
export declare function initMain(root: Root, arg: T_ARG): void;
export declare function Main({ arg }: {
    arg: T_ARG;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const setDesignMode: (b: boolean) => boolean;
export declare function onLong(): void;
//# sourceMappingURL=Main.d.ts.map