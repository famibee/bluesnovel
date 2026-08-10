import type { IpcMainEvent, IpcMainInvokeEvent, WebContents } from 'electron/main';
type IpcListenEventMap = {
    [key: string]: unknown[];
};
type IpcHandleEventMap = {
    [key: string]: (...args: any[]) => any;
};
type IpcEventMap = IpcListenEventMap | IpcHandleEventMap;
type ExtractArgs<T> = T extends IpcListenEventMap ? T : never;
type ExtractHandler<T> = T extends IpcHandleEventMap ? T : never;
export declare class IpcListener<T extends IpcEventMap> {
    #private;
    on<E extends keyof ExtractArgs<T>>(channel: Extract<E, string>, listener: (e: IpcMainEvent, ...args: ExtractArgs<T>[E]) => void | Promise<void>): void;
    handle<E extends keyof ExtractHandler<T>>(channel: Extract<E, string>, listener: (e: IpcMainInvokeEvent, ...args: Parameters<ExtractHandler<T>[E]>) => ReturnType<ExtractHandler<T>[E]> | Promise<ReturnType<ExtractHandler<T>[E]>>): void;
    dispose(): void;
}
export declare class IpcEmitter<T extends IpcListenEventMap> {
    send<E extends keyof T>(sender: WebContents, channel: Extract<E, string>, ...args: T[E]): void;
}
export {};
