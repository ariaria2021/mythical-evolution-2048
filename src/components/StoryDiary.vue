<template>
  <div class="story-diary">
    <h2 class="story-diary__title">✦ せかいの絵本 ✦</h2>
    <div class="diary-book">
      <template v-if="unlockedStories.length > 0">
        <div
          v-for="stage in allStages"
          :key="stage.value"
          :class="['diary-entry', !unlocked.has(stage.value) && 'diary-entry--locked']"
        >
          <div class="diary-entry__header">
            <span class="diary-entry__value">{{ stage.value }}</span>
            <span class="diary-entry__name">
              {{ unlocked.has(stage.value) ? stage.name : '???' }}
            </span>
          </div>
          <p class="diary-entry__story">
            {{ unlocked.has(stage.value) ? stage.story : 'まだ このお話は ひらかれていません...' }}
          </p>
        </div>
      </template>
      <div v-else class="diary-empty">
        まだ 絵本は 白紙です...<br/>
        スライムたちを 合成して 物語をひらこう！
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EVOLUTION_DATA } from '../data/evolutionData'

interface Props {
  unlocked: Set<number>
}

const props = defineProps<Props>()

const allStages = Object.values(EVOLUTION_DATA).sort((a, b) => a.value - b.value)

const unlockedStories = computed(() => {
  return allStages.filter(s => props.unlocked.has(s.value))
})
</script>
