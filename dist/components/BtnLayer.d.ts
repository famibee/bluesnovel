import type { T_BTN_STY } from './TxtLayer';
type T_BTNARG = {
    text: string;
    label: string;
    call: boolean;
    fn: string;
    arg?: string | undefined;
    url?: string | undefined;
    sty?: T_BTN_STY | undefined;
    enabled: boolean;
    onActivate: (label: string, call: boolean, fn: string, arg?: string) => void;
    onNavigate: (url: string) => void;
    onSe: (fn: string, buf: string) => void;
    onHoverCall: (label: string, fn: string) => void;
};
export default function BtnLayer({ text, label, call, fn, arg, url, sty, enabled, onActivate, onNavigate, onSe, onHoverCall }: T_BTNARG): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
