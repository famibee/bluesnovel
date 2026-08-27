import type { TTag } from './Grammar';
export declare function addPlgTag(name: string, fnc: TTag): void;
export declare function getPlgTag(name: string): TTag | undefined;
export declare function hasPlgTag(name: string): boolean;
export declare function getPlgTagNames(): string[];
export declare function clearPlgTag(): void;
