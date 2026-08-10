import type { IpcRendererEvent } from 'electron/renderer';
type IpcListenEventMap = {
    [key: string]: unknown[];
};
type IpcHandleEventMap = {
    [key: string]: (...args: any[]) => any;
};
type IpcEventMap = IpcListenEventMap | IpcHandleEventMap;
type ExtractArgs<T> = T extends IpcListenEventMap ? T : never;
type ExtractHandler<T> = T extends IpcHandleEventMap ? T : never;
type T_IPC_RENDERER = {
    send(channel: string, ...args: unknown[]): void;
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
    on(channel: string, listener: (e: IpcRendererEvent, ...args: unknown[]) => void): () => void;
    once(channel: string, listener: (e: IpcRendererEvent, ...args: unknown[]) => void): () => void;
};
declare global {
    interface Window {
        electron: {
            ipcRenderer: T_IPC_RENDERER;
        };
    }
}
export declare class IpcEmitter<T extends IpcEventMap> {
    send<E extends keyof ExtractArgs<T>>(channel: Extract<E, string>, ...args: ExtractArgs<T>[E]): void;
    invoke<E extends keyof ExtractHandler<T>>(channel: Extract<E, string>, ...args: Parameters<ExtractHandler<T>[E]>): Promise<ReturnType<ExtractHandler<T>[E]>>;
}
export declare class IpcListener<T extends IpcListenEventMap> {
    on<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E]) => void): () => void;
    once<E extends keyof T>(channel: Extract<E, string>, listener: (e: IpcRendererEvent, ...args: T[E]) => void | Promise<void>): () => void;
}
export {};
