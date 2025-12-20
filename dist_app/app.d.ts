import { HPlugin, IPlugin, IPluginInitArg, T_SysBaseParams } from './ts/CmnInterface';
export type { HPlugin, IPlugin, IPluginInitArg };
export declare class SysApp {
    constructor(...[hPlg, arg]: T_SysBaseParams);
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map