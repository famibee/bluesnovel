import { T_LAY } from '../components/Stage';
type T_STATE = {
    txt: string;
    addTxt: (t: string) => void;
    clearTxt: () => void;
    aLay: T_LAY[];
    replace: (arg: string) => void;
    addLayer: (arg: T_LAY) => void;
    chgPic: (arg: T_CHGPIC) => void;
    chgStr: (arg: T_CHGSTR) => void;
    title: string;
    addTitle: (t: string) => void;
};
export type T_CHGPIC = {
    nm: string;
    fn: string;
};
export type T_CHGSTR = {
    nm: string;
    str: string;
};
export type T_INIT_FNCS = Readonly<Pick<T_STATE, 'addLayer' | 'chgPic' | 'chgStr' | 'addTitle'>>;
export declare const useStore: import('zustand').UseBoundStore<import('zustand').StoreApi<T_STATE>>;
export {};
//# sourceMappingURL=store.d.ts.map