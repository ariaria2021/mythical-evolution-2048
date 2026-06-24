<template>
  <div v-if="isGameOver" class="game-over-overlay">
    <h2>GAME OVER</h2>
    <button class="btn-retry" @click="$emit('retry')">
      もう一度
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isGameOver: boolean
}

defineProps<Props>()
defineEmits<{
  retry: []
}>()
</script>
