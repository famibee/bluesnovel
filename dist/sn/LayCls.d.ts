import type { Layer } from './Layer';
export type T_LayerFactory = () => Layer;
export declare const A_BUILTIN_LAY_CLS: readonly ["grp", "txt"];
export declare function addLayCls(cls: string, fnc: T_LayerFactory): void;
export declare function getLayCls(cls: string): T_LayerFactory | undefined;
export declare function hasLayCls(cls: string): boolean;
export declare function clearPlgLayCls(): void;
