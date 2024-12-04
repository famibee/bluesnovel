import { SysBase } from './sn/SysBase';
import { HPlugin, IPlugin, IPluginInitArg } from './sn/CmnInterface';
export type { HPlugin, IPlugin, IPluginInitArg };
export declare class SysWeb extends SysBase {
    constructor(hPlg?: HPlugin, arg?: {
        cur: string;
        crypto: boolean;
        dip: string;
    });
}
//# sourceMappingURL=web.d.ts.map