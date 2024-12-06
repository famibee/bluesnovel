import { T_SEARCHPATH } from '../ts/ConfigBase';
import { T_LAY_IDX, T_LAY_CMN } from './Stage';
type T_GRPARG = T_LAY_CMN & {
    search: T_SEARCHPATH;
    fn: string;
};
export type T_GRPLAY = T_LAY_IDX & {
    cls: 'GRP';
} & T_GRPARG;
export default function GrpLayer({ search, fn }: T_GRPARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GrpLayer.d.ts.map