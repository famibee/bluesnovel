export declare class FocusMng {
    #private;
    add(el: HTMLElement): void;
    remove(el: HTMLElement): void;
    clear(): void;
    isFocus(el: HTMLElement): boolean;
    get length(): number;
    get idx(): number;
    getFocus(): HTMLElement | null;
    next(): void;
    prev(): void;
    blur(): void;
}
export declare const focusMng: FocusMng;
