import { SysBase } from '../SysBase';
import { T_GRPLAY } from './GrpLayer';
import { T_TXTLAY } from './TxtLaye';
export type T_LAY_IDX = {
    cls: 'GRP' | 'TXT';
    nm: string;
};
export type T_LAY_CMN = {
    visible?: boolean;
};
export type T_LAY = T_GRPLAY | T_TXTLAY;
export declare const styChild: import('@emotion/utils').SerializedStyles;
export declare const Stage: ({ sys }: {
    sys: SysBase;
}) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare function opening(sys: SysBase): void;
export declare function addLayer(l: T_LAY): void;
//# sourceMappingURL=Stage.d.ts.map