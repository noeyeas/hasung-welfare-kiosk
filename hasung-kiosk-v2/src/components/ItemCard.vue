<template>
  <div class="item-card" :class="{ 'out-of-stock': item.stock <= 0 }">
    <div class="item-icon">{{ item.icon }}</div>

    <div class="item-body">
      <div class="item-head">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-type">{{ item.type }}</span>
      </div>
      <p class="item-notice">{{ item.notice }}</p>
      <span class="item-stock">남은 수량 {{ item.stock }}개</span>
    </div>

    <button
      class="item-action"
      :class="action"
      :disabled="disabled"
      @click="onAction"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  // 'borrow' | 'return' | 'consume'
  action: { type: String, default: 'borrow' }
})

const emit = defineEmits(['borrow', 'return', 'consume'])

// 반납은 재고와 무관하게 항상 가능해야 한다 (이미 빌려간 물품이므로)
const disabled = computed(() => props.action !== 'return' && props.item.stock <= 0)

const actionLabel = computed(() => {
  if (props.action === 'return') return '반납'
  if (props.item.stock <= 0) return '품절'
  return props.action === 'consume' ? '수령' : '대여'
})

function onAction() {
  if (disabled.value) return
  emit(props.action)
}
</script>

<style scoped>
.item-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  background: #11131c;
  border: 1px solid #2c3242;
  border-radius: 18px;
}

.item-card.out-of-stock {
  opacity: 0.5;
}

.item-icon {
  font-size: 2.2rem;
  line-height: 1;
}

.item-body {
  flex: 1;
  min-width: 0;
}

.item-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.item-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #f4f4f8;
}

.item-type {
  font-size: 0.8rem;
  color: #8f9bb3;
  border: 1px solid #2c3242;
  border-radius: 999px;
  padding: 2px 10px;
}

.item-notice {
  margin: 6px 0 0;
  font-size: 0.88rem;
  color: #bfc6de;
}

.item-stock {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85rem;
  color: #8f9bb3;
}

.item-action {
  flex-shrink: 0;
  min-width: 110px;
  padding: 14px 22px;
  border: none;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #617dff, #4e5fe5);
}

.item-action.return {
  background: linear-gradient(135deg, #ff9f7d, #f2734a);
}

.item-action:disabled {
  background: #252836;
  color: #6b7386;
  cursor: not-allowed;
}

.item-action:not(:disabled):active {
  transform: scale(0.97);
}
</style>
