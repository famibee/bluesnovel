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
    existsSync: (path: string) => Promise<boolean>;
    readFile: (path: string) => Promise<string>;
    dec: (ext: string, tx: string) => Promise<string>;
    userDataDir: string;
    downloadsDir: string;
    appVersion: string;
    platform: string;
    arch: string;
    iconPath: string;
    bookTitle: string;
    homepage: string;
    pubUrl: string;
    navigateTo: (url: string) => void;
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
export declare function updateCheck(urlArg: string, deps: T_UpdateCheckDeps): Promise<void>;
