<template>
  <div
    :class="[
      'tile',
      `tile-${cell.value}`,
      cell.isNew && 'tile-new',
      cell.mergedFrom && 'tile-merged'
    ]"
    :style="positionStyle"
  >
    <img
      v-if="spriteUrl"
      :src="spriteUrl"
      :alt="creatureName"
      class="tile__sprite"
    />
    <span class="tile__name">{{ creatureName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import type { Tile } from '../types'
import { EVOLUTION_DATA } from '../data/evolutionData'
import { SPRITES, renderSpriteToDataUrl } from '../data/sprites'

interface Props {
  cell: Tile
}

const props = defineProps<Props>()

const creatureName = computed(() => {
  return EVOLUTION_DATA[props.cell.value]?.name ?? `Lv${props.cell.value}`
})

const spriteUrl = computed(() => {
  const sprite = SPRITES[props.cell.value]
  if (!sprite) return null
  return renderSpriteToDataUrl(sprite, 4)
})

const positionStyle = computed<CSSProperties>(() => {
  const [row, col] = props.cell.position
  return {
    width: `calc((100% - 3 * var(--gap)) / 4)`,
    height: `calc((100% - 3 * var(--gap)) / 4)`,
    left: `calc(${col} * (25% + var(--gap) / 4))`,
    top: `calc(${row} * (25% + var(--gap) / 4))`,
  }
})
</script>
