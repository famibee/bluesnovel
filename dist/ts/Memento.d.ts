export declare abstract class BaseMemento {
    #private;
    init(onUpdate: () => void): void;
    protected stt: string;
    onUpdate($stt: string): void;
    abstract readonly nm: string;
    get state(): string;
    setState(state: string): void;
    protected abstract replace(): void;
}
export declare class Caretaker {
    #private;
    add(m: BaseMemento): void;
    set key($key: string);
    backup(key?: string): void;
    undo(key: string): void;
    beforeKey(): void;
    afterKey(): void;
    gotoKey(): void;
}
//# sourceMappingURL=Memento.d.ts.map