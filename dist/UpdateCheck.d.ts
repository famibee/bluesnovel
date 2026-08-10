export type T_UpdateCheckDeps = {
    fetchText: (url: string) => Promise<{
        ok: boolean;
        txt: string;
    }>;
    fetchAb: (url: string) => Promise<{
        ok: boolean;
        ab: ArrayBuffer;
    }>;
    writeFile: (path: string, data: NodeJS.ArrayBufferView) => Promise<void>;
    showMessageBox: (o: T_MessageBoxOptions) => Promise<{
        response: number;
    }>;
    downloadsDir: string;
    appVersion: string;
    platform: string;
    arch: string;
    iconPath: string;
    bookTitle: string;
    isMac: boolean;
    debugLog: boolean;
};
export type T_MessageBoxOptions = {
    title: string;
    icon: string;
    buttons: string[];
    defaultId: number;
    cancelId: number;
    message: string;
    detail?: string;
};
export declare function updateCheck(url: string, deps: T_UpdateCheckDeps): Promise<void>;
