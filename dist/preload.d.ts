export type TAG_WINDOW = {
    c: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
};
export type HPROC = {
    getInfo: () => Promise<HINFO>;
};
export type HINFO = {
    getAppPath: string;
    isPackaged: boolean;
    downloads: string;
    userData: string;
    getVersion: string;
    env: {
        [name: string]: any;
    };
    platform: string;
    arch: string;
};
export declare const to_app: HPROC;
//# sourceMappingURL=preload.d.ts.map