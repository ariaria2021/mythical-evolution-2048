<template>
  <div class="board-container">
    <!-- Background grid -->
    <div class="grid-container">
      <div v-for="i in 16" :key="i" class="grid-cell" />
    </div>

    <!-- Tile layer -->
    <div class="tile-layer">
      <TileComp v-for="cell in tiles" :key="cell.id" :cell="cell" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Grid } from '../types'
import TileComp from './Tile.vue'

interface Props {
  grid: Grid
}

const props = defineProps<Props>()

const tiles = computed(() => {
  return props.grid.flat().filter(cell => cell !== null)
})
</script>
