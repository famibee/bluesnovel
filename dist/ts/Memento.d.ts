export declare abstract class BaseMemento {
    protected readonly stt: string;
    abstract readonly nm: string;
    constructor(stt?: string);
    abstract restore(): void;
}
export declare class Caretaker {
    #private;
    push(key: string): void;
    update(_genMeMe: () => BaseMemento): void;
    undo(key: string): void;
    prevKey(): boolean;
    nextKey(): boolean;
    isLast(): boolean;
}
//# sourceMappingURL=Memento.d.ts.map