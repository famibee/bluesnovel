import { T_LAY } from '../components/Stage';
type T_STATE = {
    happys: number;
    happysUp: () => void;
    aLay: T_LAY[];
    addLayer: (l: T_LAY) => void;
};
export declare const useStore: import('zustand').UseBoundStore<import('zustand').StoreApi<T_STATE>>;
export {};
//# sourceMappingURL=store.d.ts.map