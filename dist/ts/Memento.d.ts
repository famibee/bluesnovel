export interface IMemento {
    getState(): string;
    setState(state: string): void;
}
export declare class Caretaker {
    #private;
    add(m: IMemento): void;
    backup(key: string): void;
    undo(key: string): void;
    beforeKey(): void;
    afterKey(): void;
    gotoKey(): void;
}
//# sourceMappingURL=Memento.d.ts.map