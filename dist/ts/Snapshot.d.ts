export type T_SNAP_ARG = {
    el: HTMLElement;
    sw: number;
    sh: number;
    width: number;
    height: number;
    bgColor: string;
    page: 'fore' | 'back';
    aLayNm: string[] | null;
};
export declare function snapshotToPng(o: T_SNAP_ARG): Promise<string>;
export declare function savePic(fn: string, dataUrl: string): void;
