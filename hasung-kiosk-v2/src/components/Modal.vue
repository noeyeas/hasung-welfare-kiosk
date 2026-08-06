<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="emit('close')">
        <div class="modal-card" @click.stop>
          <h3 class="modal-title">{{ title }}</h3>
          <!-- message 에 \n 이 포함되므로 white-space: pre-line 으로 줄바꿈 처리 -->
          <p class="modal-message">{{ message }}</p>

          <div class="modal-actions">
            <button v-if="showCancel" class="btn-cancel" @click="onCancel">
              취소
            </button>
            <button class="btn-confirm" @click="onConfirm">확인</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  showCancel: { type: Boolean, default: true }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

function onConfirm() {
  emit('confirm')
  emit('close')
}

function onCancel() {
  emit('cancel')
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 24px;
}

.modal-card {
  width: min(520px, 100%);
  background: #1c1f28;
  border: 1px solid #2c3242;
  border-radius: 22px;
  padding: 28px 30px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  color: #f4f4f8;
}

.modal-title {
  margin: 0 0 14px;
  font-size: 1.25rem;
  color: #cbd3ff;
}

.modal-message {
  margin: 0;
  white-space: pre-line;
  line-height: 1.6;
  color: #dfe4f5;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 26px;
}

.modal-actions button {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 16px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-confirm {
  background: linear-gradient(135deg, #617dff, #4e5fe5);
  color: #fff;
}

.btn-cancel {
  background: #252836;
  color: #e0e4ff;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
