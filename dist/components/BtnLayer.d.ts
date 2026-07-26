import type { T_BTN_STY } from './TxtLayer';
type T_BTNARG = {
    text: string;
    label: string;
    call: boolean;
    fn: string;
    sty?: T_BTN_STY | undefined;
    onActivate: (label: string, call: boolean, fn: string) => void;
};
export default function BtnLayer({ text, label, call, fn, sty, onActivate }: T_BTNARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
