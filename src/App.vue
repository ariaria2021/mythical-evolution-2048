<template>
  <div
    class="app-container"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <Header
      :score="score"
      :bestScore="bestScore"
      @reset="handleReset"
    />

    <div style="position: relative; width: 100%; margin: 0 auto">
      <Board :grid="grid" />
      <GameOverlay :is-game-over="gameOver" @retry="handleReset" />
    </div>

    <!-- Navigation tabs -->
    <div class="nav-tabs">
      <button
        :class="['nav-tab', currentTab === 'game' && 'nav-tab--active']"
        @click="currentTab = 'game'"
      >
        🎮 ゲーム
      </button>
      <button
        :class="['nav-tab', currentTab === 'collection' && 'nav-tab--active']"
        @click="currentTab = 'collection'"
      >
        📖 図鑑
      </button>
      <button
        :class="['nav-tab', currentTab === 'story' && 'nav-tab--active']"
        @click="currentTab = 'story'"
      >
        📓 絵本
      </button>
    </div>

    <!-- Tab content -->
    <CollectionBook v-if="currentTab === 'collection'" :unlocked="unlockedValues" />
    <StoryDiary v-if="currentTab === 'story'" :unlocked="unlockedValues" />

    <p v-if="currentTab === 'game'" style="text-align: center; margin-top: 14px; color: #8888aa; font-size: 12px;">
      <strong>矢印キー</strong> or <strong>スワイプ</strong> でスライムを合成！
    </p>

    <!-- Unlock notification -->
    <UnlockNotification
      :unlockedValue="latestUnlock"
      @dismissed="latestUnlock = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useGame } from './composables/useGame'
import Board from './components/Board.vue'
import Header from './components/Header.vue'
import GameOverlay from './components/GameOverlay.vue'
import UnlockNotification from './components/UnlockNotification.vue'
import CollectionBook from './components/CollectionBook.vue'
import StoryDiary from './components/StoryDiary.vue'
import './styles/global.css'

const { grid, score, bestScore, unlockedValues, move, resetGame, gameOver } = useGame()

const currentTab = ref<'game' | 'collection' | 'story'>('game')
const latestUnlock = ref<number | null>(null)

// Watch for new unlocks
const previousUnlocked = ref(new Set(unlockedValues.value))
watch(() => [...unlockedValues.value], (newVals) => {
  const newSet = new Set(newVals)
  for (const v of newSet) {
    if (!previousUnlocked.value.has(v)) {
      latestUnlock.value = v
      break
    }
  }
  previousUnlocked.value = new Set(newSet)
})

// Reset handler
const handleReset = () => {
  resetGame()
}

// Keyboard input
const handleKeyDown = (e: KeyboardEvent) => {
  if (gameOver.value) return

  switch (e.key) {
    case 'ArrowUp':
      move('UP')
      e.preventDefault()
      break
    case 'ArrowDown':
      move('DOWN')
      e.preventDefault()
      break
    case 'ArrowLeft':
      move('LEFT')
      e.preventDefault()
      break
    case 'ArrowRight':
      move('RIGHT')
      e.preventDefault()
      break
  }
}

// Touch input
const touchStart = ref<{ x: number; y: number } | null>(null)

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!touchStart.value || gameOver.value) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchEndX - touchStart.value.x
  const diffY = touchEndY - touchStart.value.y
  const threshold = 30

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > threshold) {
      move(diffX > 0 ? 'RIGHT' : 'LEFT')
    }
  } else {
    if (Math.abs(diffY) > threshold) {
      move(diffY > 0 ? 'DOWN' : 'UP')
    }
  }
  touchStart.value = null
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
