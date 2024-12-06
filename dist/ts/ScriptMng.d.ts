import { SysBase } from '../SysBase';
import { AssetsClass } from '@pixi/assets';
export declare class ScriptMng {
    #private;
    private readonly sys;
    private readonly Assets;
    static generate(sys: SysBase, Assets: AssetsClass): Promise<ScriptMng>;
    private constructor();
    load(fn: string): Promise<void>;
}
//# sourceMappingURL=ScriptMng.d.ts.map