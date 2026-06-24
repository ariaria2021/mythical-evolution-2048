<template>
  <Teleport to="body">
    <div v-if="visible" class="unlock-notification" @click="dismiss">
      <div class="unlock-notification__label">✦ NEW DISCOVERY ✦</div>
      <div class="unlock-notification__name">{{ stage?.name }}</div>
      <div class="unlock-notification__desc">{{ stage?.description }}</div>
      <button class="unlock-notification__btn" @click.stop="dismiss">OK</button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { EVOLUTION_DATA } from '../data/evolutionData'

interface Props {
  unlockedValue: number | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  dismissed: []
}>()

const visible = ref(false)

const stage = computed(() => {
  if (props.unlockedValue === null) return null
  return EVOLUTION_DATA[props.unlockedValue] ?? null
})

watch(() => props.unlockedValue, (val) => {
  if (val !== null) {
    visible.value = true
  }
})

const dismiss = () => {
  visible.value = false
  emit('dismissed')
}
</script>
