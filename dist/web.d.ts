import type { T_HPlugin, T_Plugin, T_PluginInitArg } from './sn/CmnInterface';
export type { T_HPlugin, T_Plugin, T_PluginInitArg };
import type { TArg } from './sn/Grammar';
export type { TArg };
import { SysBase } from './sn/SysBase';
import type { T_SysBaseParams, T_SysBaseLoadedParams } from './sn/CmnInterface';
import { argChk_Num, argChk_Boolean } from './sn/CmnLib';
import { Layer } from './sn/Layer';
import type { T_RecordPlayBack_lay } from './sn/Layer';
export { argChk_Num, argChk_Boolean, Layer };
export type { T_RecordPlayBack_lay };
export declare class SysWeb extends SysBase {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    runSN(prj: string): Promise<void>;
    appendFile(path: string, data: string): Promise<void>;
}
