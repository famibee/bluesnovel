import { SysBase } from '../SysBase';
import { T_LAY_IDX, T_LAY_CMN } from './Stage';
type T_TXTARG = T_LAY_CMN & {
    sys: SysBase;
    str: string;
    b_color?: number;
};
export type T_TXTLAY = T_LAY_IDX & {
    cls: 'TXT';
} & T_TXTARG;
export default function TxtLayer({ styChild }: T_TXTARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TxtLaye.d.ts.map