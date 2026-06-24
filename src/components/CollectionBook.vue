<template>
  <div class="collection-book">
    <h2 class="collection-book__title">✦ 神獣図鑑 ✦</h2>
    <div class="collection-grid">
      <div
        v-for="stage in allStages"
        :key="stage.value"
        :class="[
          'collection-card',
          unlocked.has(stage.value) ? 'collection-card--unlocked' : 'collection-card--locked'
        ]"
      >
        <template v-if="unlocked.has(stage.value)">
          <img
            v-if="getSpriteUrl(stage.value)"
            :src="getSpriteUrl(stage.value)!"
            :alt="stage.name"
            class="collection-card__sprite"
          />
          <div class="collection-card__name">{{ stage.name }}</div>
          <div class="collection-card__value">Lv.{{ stage.value }}</div>
        </template>
        <template v-else>
          <div class="collection-card__lock">🔒</div>
          <div class="collection-card__name">???</div>
          <div class="collection-card__value">Lv.{{ stage.value }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EVOLUTION_DATA } from '../data/evolutionData'
import { SPRITES, renderSpriteToDataUrl } from '../data/sprites'

interface Props {
  unlocked: Set<number>
}

defineProps<Props>()

const allStages = Object.values(EVOLUTION_DATA).sort((a, b) => a.value - b.value)

const spriteCache = new Map<number, string>()

const getSpriteUrl = (value: number): string | null => {
  if (spriteCache.has(value)) return spriteCache.get(value)!
  const sprite = SPRITES[value]
  if (!sprite) return null
  const url = renderSpriteToDataUrl(sprite, 4)
  spriteCache.set(value, url)
  return url
}
</script>
