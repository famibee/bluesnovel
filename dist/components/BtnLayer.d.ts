import type { T_BTN_STY } from './TxtLayer';
type T_BTNARG = {
    text: string;
    label: string;
    call: boolean;
    fn: string;
    arg?: string | undefined;
    sty?: T_BTN_STY | undefined;
    enabled: boolean;
    onActivate: (label: string, call: boolean, fn: string, arg?: string) => void;
    onSe: (fn: string, buf: string) => void;
};
export default function BtnLayer({ text, label, call, fn, arg, sty, enabled, onActivate, onSe }: T_BTNARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
