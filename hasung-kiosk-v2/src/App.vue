<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useItemStore } from './stores/itemStore'

const itemStore = useItemStore()

// IndexedDB 초기화 및 초기 데이터 적재
onMounted(async () => {
  try {
    await itemStore.initialize()
  } catch (error) {
    console.error('초기화 실패:', error)
  }
})
</script>
