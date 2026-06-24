import { Grid, Tile } from '../types';
import { GRID_SIZE, generateId } from './gridUtils';

// Rotate grid 90 degrees clockwise
export const rotateRight = (grid: Grid): Grid => {
    const newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[c][GRID_SIZE - 1 - r] = grid[r][c];
        }
    }
    return newGrid;
};

// Rotate grid 90 degrees counter-clockwise
export const rotateLeft = (grid: Grid): Grid => {
    const newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[GRID_SIZE - 1 - c][r] = grid[r][c];
        }
    }
    return newGrid;
};

// Process one row: slide and merge to the left
export const processRow = (row: (Tile | null)[]): { newRow: (Tile | null)[], score: number } => {
    // 1. Remove nulls
    let tiles = row.filter((tile) => tile !== null) as Tile[];
    let score = 0;

    // 2. Merge
    const mergedTiles: Tile[] = [];
    let skip = false;

    for (let i = 0; i < tiles.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }

        const current = tiles[i];
        const next = tiles[i + 1];

        if (next && current.value === next.value) {
            // Merge occurs
            const doubledValue = current.value * 2;
            score += doubledValue;

            mergedTiles.push({
                ...current,
                id: generateId(),
                value: doubledValue,
                mergedFrom: [current, next],
                isNew: false,
            });
            skip = true;
        } else {
            // No merge
            mergedTiles.push({
                ...current,
                mergedFrom: undefined,
                isNew: false,
            });
        }
    }

    // 3. Fill with nulls to restore length
    const newRow = [...mergedTiles, ...Array(GRID_SIZE - mergedTiles.length).fill(null)];
    return { newRow, score };
};
