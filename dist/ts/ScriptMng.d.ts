import { SysBase } from '../SysBase';
import { AssetsClass } from '@pixi/assets';
export declare class ScriptMng {
    #private;
    private readonly sys;
    private readonly Assets;
    constructor(sys: SysBase, Assets: AssetsClass);
    load(fn: string): Promise<void>;
}
//# sourceMappingURL=ScriptMng.d.ts.map