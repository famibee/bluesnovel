export declare abstract class BaseMemento {
    protected readonly stt: string;
    abstract readonly nm: string;
    constructor(stt?: string);
    abstract restore(): void;
}
export declare class Caretaker {
    #private;
    set key(key: string);
    update(genMeMe: () => BaseMemento): void;
    undo(key: string): void;
    beforeKey(): boolean;
    afterKey(): boolean;
    isLast(): boolean;
}
//# sourceMappingURL=Memento.d.ts.map