import { T_LAY_IDX, T_LAY_CMN } from './Stage';
type T_GRPARG = T_LAY_CMN & {
    fn: string;
};
export type T_GRPLAY = T_LAY_IDX & {
    cls: 'GRP';
} & T_GRPARG;
export default function GrpLayer({ cmn: { styChild, sys }, fn }: T_GRPARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GrpLayer.d.ts.map