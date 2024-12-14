import { SysBase } from '../SysBase';
import { T_GRPLAY } from './GrpLayer';
import { T_TXTLAY } from './TxtLayer';
import { T_ARG } from './Main';
import { SerializedStyles } from '@emotion/react';
export type T_LAY_IDX = {
    cls: 'GRP' | 'TXT';
    nm: string;
};
export type T_LAY_CMN = {
    cmn: {
        sys: SysBase;
        styChild: SerializedStyles;
        sty4Moveable: any;
        visible?: boolean;
    };
};
export type T_LAY = T_GRPLAY | T_TXTLAY;
export default function Stage({ arg: { sys }, onClick }: {
    arg: T_ARG;
    onClick: () => void;
}): import("@emotion/react/jsx-runtime").JSX.Element;
export declare const getDesignMode: () => boolean;
//# sourceMappingURL=Stage.d.ts.map