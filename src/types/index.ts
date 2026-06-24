export interface Tile {
    id: string;
    value: number;
    position: [number, number]; // [row, col]
    mergedFrom?: [Tile, Tile];
    isNew?: boolean;
}

export type Grid = (Tile | null)[][];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface EvolutionStage {
    value: number;
    name: string;
    description: string;
    story: string;
    // 将来的には画像パスなども追加
    asset8bit?: string;
    assetWatercolor?: string;
    assetCrayon?: string;
}
