export type T_SWIPE_DIR = 'swipeleft' | 'swiperight' | 'swipeup' | 'swipedown';
export declare function detectSwipe(dx: number, dy: number, w: number, h: number): T_SWIPE_DIR | undefined;
