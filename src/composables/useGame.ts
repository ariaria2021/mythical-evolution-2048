import { ref, computed, watch } from 'vue';
import { Grid, Direction, Tile } from '../types';
import { createEmptyGrid, addRandomTile, isGameOver } from '../utils/gridUtils';
import { rotateLeft, rotateRight, processRow } from '../utils/moveUtils';

const STORAGE_KEY = 'mythical-evolution-2048';

interface SaveData {
    bestScore: number;
    unlockedValues: number[];
}

function loadSaveData(): SaveData {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            return {
                bestScore: data.bestScore ?? 0,
                unlockedValues: data.unlockedValues ?? [2, 4],
            };
        }
    } catch { /* ignore */ }
    return { bestScore: 0, unlockedValues: [2, 4] };
}

function saveSaveData(data: SaveData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
}

export const useGame = () => {
    const savedData = loadSaveData();

    const grid = ref<Grid>((() => {
        let initialGrid = createEmptyGrid();
        initialGrid = addRandomTile(initialGrid);
        initialGrid = addRandomTile(initialGrid);
        return initialGrid;
    })());

    const score = ref(0);
    const bestScore = ref(savedData.bestScore);
    const unlockedValues = ref<Set<number>>(new Set(savedData.unlockedValues));

    // Auto-save when persistent data changes
    watch([bestScore, unlockedValues], () => {
        saveSaveData({
            bestScore: bestScore.value,
            unlockedValues: [...unlockedValues.value],
        });
    }, { deep: true });

    const move = (direction: Direction): boolean => {
        let totalScore = 0;
        let processingGrid = grid.value.map(row => [...row]);

        // Rotate grid based on direction to reuse processRow (which always slides left)
        if (direction === 'RIGHT') {
            processingGrid = rotateRight(rotateRight(processingGrid));
        } else if (direction === 'UP') {
            processingGrid = rotateLeft(processingGrid);
        } else if (direction === 'DOWN') {
            processingGrid = rotateRight(processingGrid);
        }

        // Process each row
        const newRows = processingGrid.map((row) => {
            const { newRow, score: rowScore } = processRow(row);
            totalScore += rowScore;
            return newRow;
        });

        // Rotate back to original orientation
        let computedGrid = newRows;
        if (direction === 'RIGHT') {
            computedGrid = rotateLeft(rotateLeft(computedGrid));
        } else if (direction === 'UP') {
            computedGrid = rotateRight(computedGrid);
        } else if (direction === 'DOWN') {
            computedGrid = rotateLeft(computedGrid);
        }

        // Check if anything changed
        const isChanged = JSON.stringify(grid.value.map(r => r.map(c => c?.value))) !==
            JSON.stringify(computedGrid.map(r => r.map(c => c?.value)));

        if (isChanged) {
            score.value += totalScore;
            if (score.value > bestScore.value) {
                bestScore.value = score.value;
            }

            // Sync positions
            let finalGrid = computedGrid.map((row, r) =>
                row.map((cell, c) => (cell ? { ...cell, position: [r, c] as [number, number] } : null))
            );

            // Add new random tile
            finalGrid = addRandomTile(finalGrid);

            // Check for new unlocks
            finalGrid.forEach(row => {
                row.forEach(tile => {
                    if (tile && !unlockedValues.value.has(tile.value)) {
                        unlockedValues.value = new Set([...unlockedValues.value, tile.value]);
                    }
                });
            });

            grid.value = finalGrid;
            return true;
        }

        return false;
    };

    const resetGame = () => {
        let newGrid = createEmptyGrid();
        newGrid = addRandomTile(newGrid);
        newGrid = addRandomTile(newGrid);
        grid.value = newGrid;
        score.value = 0;
    };

    const gameOver = computed(() => isGameOver(grid.value));

    return {
        grid,
        score,
        bestScore,
        unlockedValues,
        move,
        resetGame,
        gameOver,
    };
};
