import { SysBase } from '../ts/SysBase';
import { IHTag } from '../ts/Grammar';
import { T_INIT_FNCS } from '../store/store';
import { Root } from 'react-dom/client';
export type T_ARG = {
    heStage: HTMLElement;
    sys: SysBase;
    hTag: IHTag;
    procNext: () => void;
    attachTsx: (trgNext: () => void, fncs: T_INIT_FNCS) => void;
};
export declare function initMain(root: Root, arg: T_ARG): void;
export declare function Main({ arg }: {
    arg: T_ARG;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const setDesignMode: (b: boolean) => boolean;
export declare function onLong(): void;
//# sourceMappingURL=Main.d.ts.map