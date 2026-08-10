import type { SysBase } from '../sn/SysBase';
export declare function decryptPicUrl(url: string, crypto: boolean, sysFetch: SysBase['fetch'], sysDecAB: SysBase['decAB']): Promise<string>;
