import { SysBase } from '../SysBase';
import { T_GRPLAY } from './GrpLayer';
import { T_TXTLAY } from './TxtLaye';
import { T_CHGPIC } from '../store/store';
import { BaseMemento } from '../ts/Memento';
import { SerializedStyles } from '@emotion/react';
export type T_LAY_IDX = {
    cls: 'GRP' | 'TXT';
    nm: string;
};
export type T_LAY_CMN = {
    cmn: {
        sys: SysBase;
        styChild: SerializedStyles;
        visible?: boolean;
    };
};
export type T_LAY = T_GRPLAY | T_TXTLAY;
export declare const Stage: () => import("@emotion/react/jsx-runtime").JSX.Element;
export declare function opening($heStage: HTMLElement, $sys: SysBase): Promise<void>;
export declare function addLayer(detail: T_LAY): void;
export declare function chgPic(detail: T_CHGPIC): void;
export declare class Memento extends BaseMemento {
    readonly nm = "Stage";
    protected stt: string;
    protected replace(): void;
}
//# sourceMappingURL=Stage.d.ts.map