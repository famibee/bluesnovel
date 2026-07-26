import { type T_ARG } from './Main';
export default function Stage({ arg: { heStage, sys, scrMng }, onClick, prev, next, }: {
    arg: T_ARG;
    onClick: () => void;
    prev: () => void;
    next: () => void;
}): import("@emotion/react/jsx-runtime").JSX.Element;
