export declare abstract class BaseMemento {
    protected readonly stt: string;
    abstract readonly nm: string;
    constructor(stt?: string);
    abstract restore(): void;
}
export type T_SAVE_MEMENTO = () => BaseMemento;
export declare class Caretaker {
    #private;
    add(save: T_SAVE_MEMENTO): void;
    set key(key: string);
    update(): void;
    undo(key: string): void;
    beforeKey(): boolean;
    afterKey(): boolean;
    isLast(): boolean;
}
//# sourceMappingURL=Memento.d.ts.map