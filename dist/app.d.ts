import { HPlugin, IPlugin, IPluginInitArg } from './CmnInterface';
import { T_SysBaseParams } from './ts/CmnInterface';
export type { HPlugin, IPlugin, IPluginInitArg };
export declare class SysApp {
    constructor(...[hPlg, arg]: T_SysBaseParams);
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map