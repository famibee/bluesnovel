type T_PLACE = 'top' | 'bottom' | 'left' | 'right';
export declare function hintPlace(opt: string | undefined): T_PLACE;
export declare function hintPos(trg: {
    left: number;
    top: number;
    width: number;
    height: number;
}, box: {
    width: number;
    height: number;
}, place: T_PLACE, gap?: number): {
    left: number;
    top: number;
};
export declare function hintFlip(trg: {
    left: number;
    top: number;
    width: number;
    height: number;
}, box: {
    width: number;
    height: number;
}, place: T_PLACE, gap: number, viewport: {
    width: number;
    height: number;
}): T_PLACE;
export declare function clampPos(pos: {
    left: number;
    top: number;
}, box: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}): {
    left: number;
    top: number;
};
declare class HintMng {
    #private;
    show(trg: Element, text: string, style?: string, opt?: string): void;
    hide(): void;
}
export declare const hintMng: HintMng;
export {};
