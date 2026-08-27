import { Layer } from './Layer';
export declare class PlgLayer extends Layer {
    static setup(..._a: unknown[]): void;
    get htm(): HTMLDivElement;
    snapshot(_rnd: unknown, re: () => void): void;
    snapshot_end(): void;
    snapshotByCanvas(_cvs: HTMLCanvasElement, _rnd: unknown, re: () => void): void;
}
