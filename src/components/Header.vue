<template>
  <div class="header">
    <div class="header__title">
      神獣進化<br/>2048
    </div>

    <div class="header__scores">
      <div class="score-box">
        <div class="score-box__label">SCORE</div>
        <div class="score-box__value">{{ score }}</div>
      </div>
      <div class="score-box">
        <div class="score-box__label">BEST</div>
        <div class="score-box__value">{{ bestScore }}</div>
      </div>
      <button class="btn-reset" @click="$emit('reset')">
        New Game
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  score: number
  bestScore: number
}

defineProps<Props>()
defineEmits<{
  reset: []
}>()
</script>
