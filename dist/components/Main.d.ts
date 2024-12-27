import { SysBase } from '../ts/SysBase';
import { ScriptMng } from '../ts/ScriptMng';
import { Root } from 'react-dom/client';
export type T_ARG = {
    heStage: HTMLElement;
    sys: SysBase;
};
export declare function initMain(root: Root, { heStage, sys }: T_ARG): void;
export declare function start(scrMng: ScriptMng): Promise<void>;
export declare function Main({ heStage, sys }: T_ARG): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const setDesignMode: (b: boolean) => boolean;
export declare function onLong(): void;
//# sourceMappingURL=Main.d.ts.map