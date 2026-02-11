<template>
  <div class="kiosk">
    <div id="step-items">
      <h1 class="step-title">물품을 선택하세요</h1>

      <!-- 필터 버튼 -->
      <div class="filter-buttons">
        <button
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
          전체
        </button>
        <button
          :class="{ active: filter === '대여' }"
          @click="filter = '대여'"
        >
          대여품
        </button>
        <button
          :class="{ active: filter === '소모품' }"
          @click="filter = '소모품'"
        >
          소모품
        </button>
      </div>

      <!-- 물품 목록 -->
      <div class="item-grid" ref="itemGrid">
        <ItemCard
          v-for="item in filteredItems"
          :key="item.name"
          :item="item"
          :action="getBorrowStatus(item)"
          @borrow="handleBorrow(item)"
          @return="handleReturn(item)"
          @consume="handleConsume(item)"
        />
      </div>

      <!-- 하단 액션 버튼 -->
      <div class="actions">
        <button @click="handleEditInfo" class="btn-secondary">
          정보 수정
        </button>
        <button @click="handleFinish" class="btn-primary">
          완료
        </button>
      </div>
    </div>

    <!-- 사용자 정보 팝업 -->
    <div class="user-info-popup" :style="userPopupPosition">
      <div
        class="user-info-card"
        ref="userCard"
        @mousedown="startDrag($event, 'user')"
      >
        <div v-html="userInfoHtml"></div>
        <!-- 카메라 미리보기 -->
        <div v-if="authStore.cameraConsent" class="camera-section">
          <CameraRecorder
            ref="cameraRecorder"
            :active="authStore.cameraConsent"
            @recorded="onVideoRecorded"
          />
        </div>
      </div>
    </div>

    <!-- 선택 결과 팝업 -->
    <Transition name="fade">
      <div v-if="selectionMessage" id="selectionResult" class="result">
        {{ selectionMessage }}
      </div>
    </Transition>

    <!-- 확인 모달 -->
    <Modal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      :showCancel="modalShowCancel"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useItemStore } from '../stores/itemStore'
import ItemCard from '../components/ItemCard.vue'
import Modal from '../components/Modal.vue'
import CameraRecorder from '../components/CameraRecorder.vue'
import { getDueInfo } from '../utils/dateUtils'
import { DEBOUNCE_TIME } from '../utils/constants'

const router = useRouter()
const authStore = useAuthStore()
const itemStore = useItemStore()

// 필터
const filter = ref('all')

// 팝업 위치
const userPopupPosition = ref({ top: '20px', left: '20px' })
const userCard = ref(null)

// 드래그 관련
const dragging = ref(null)
const dragOffset = ref({ x: 0, y: 0 })

// 모달
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const modalShowCancel = ref(true)
const modalAction = ref(null)

// 선택 메시지
const selectionMessage = ref('')
let selectionTimer = null

// 카메라
const cameraRecorder = ref(null)
let pendingAction = null

// 디바운스
let debounceTimer = null

// 필터링된 물품
const filteredItems = computed(() => {
  if (filter.value === 'all') {
    return itemStore.items
  }
  return itemStore.items.filter(item => item.type === filter.value)
})

// 사용자 정보 HTML
const userInfoHtml = computed(() => {
  if (!authStore.currentUser) return ''

  const dueInfo = getDueInfo()
  const borrowedItems = itemStore.getUserBorrowedItems(
    authStore.currentUser.studentId
  )

  let html = `<strong>${authStore.currentUser.name} (${authStore.currentUser.studentId})</strong><br>`
  html += `연락처: ${authStore.currentUser.phone}<br>`
  html += `반납 기한: <span style="color: #ff8f8f; font-weight: 600;">${dueInfo.label}</span><br>`

  if (borrowedItems.length > 0) {
    html += `<br><strong>대여 중인 물품:</strong><ul style="margin: 8px 0 0; padding-left: 20px;">`
    borrowedItems.forEach(record => {
      html += `<li>${record.itemName} (${record.dueLabel.replace(
        ' 18:00',
        ''
      )})</li>`
    })
    html += `</ul>`
  }

  html += `<ul style="margin: 10px 0 0; padding-left: 18px; color: #bfc6de; font-size: 0.88rem;">`
  html += `<li>기한 초과 시 1일당 2,000원 벌금 (주말 포함)</li>`
  html += `<li>${
    dueInfo.isWeekendPenalty
      ? '같은 주 내 미반납 시 주말에도 벌금이 부과됩니다.'
      : '금요일 대여는 다음 주 월요일 18:00까지 반납'
  }</li>`
  html += `<li>물품 분실·파손 시 동일 제품으로 변상</li>`
  html += `</ul>`

  return html
})

// 대여 상태 확인
function getBorrowStatus(item) {
  if (item.type === '소모품') return 'consume'

  const borrowed = itemStore.getUserBorrowedItems(
    authStore.currentUser.studentId
  )
  const hasBorrowed = borrowed.some(r => r.itemName === item.name)

  return hasBorrowed ? 'return' : 'borrow'
}

// 카메라 녹화 시작
async function recordAndSave(actionName) {
  if (authStore.cameraConsent && cameraRecorder.value) {
    cameraRecorder.value.startRecording(3000)
    pendingAction = actionName
  }
}

// 녹화 완료 콜백
async function onVideoRecorded(blob) {
  if (pendingAction && authStore.currentUser) {
    await itemStore.saveCameraRecord(authStore.currentUser, pendingAction, blob)
    pendingAction = null
  }
}

// 대여 처리
async function handleBorrow(item) {
  if (debounceTimer) return

  try {
    debounceTimer = setTimeout(() => {
      debounceTimer = null
    }, DEBOUNCE_TIME)

    await itemStore.borrowItem(item.name, authStore.currentUser)
    recordAndSave(`대여: ${item.name}`)
    showSelectionMessage(`✅ ${item.name}을(를) 대여했습니다`)
    authStore.resetAutoLogoutTimer()
  } catch (error) {
    alert(error.message)
  }
}

// 반납 처리
async function handleReturn(item) {
  if (debounceTimer) return

  try {
    debounceTimer = setTimeout(() => {
      debounceTimer = null
    }, DEBOUNCE_TIME)

    await itemStore.returnItem(item.name, authStore.currentUser)
    recordAndSave(`반납: ${item.name}`)
    showSelectionMessage(`✅ ${item.name}을(를) 반납했습니다`)
    authStore.resetAutoLogoutTimer()
  } catch (error) {
    alert(error.message)
  }
}

// 소모품 수령
async function handleConsume(item) {
  if (debounceTimer) return

  try {
    debounceTimer = setTimeout(() => {
      debounceTimer = null
    }, DEBOUNCE_TIME)

    await itemStore.consumeItem(item.name, authStore.currentUser)
    recordAndSave(`수령: ${item.name}`)
    showSelectionMessage(`✅ ${item.name}을(를) 수령했습니다`)
    authStore.resetAutoLogoutTimer()
  } catch (error) {
    alert(error.message)
  }
}

// 선택 메시지 표시
function showSelectionMessage(message) {
  selectionMessage.value = message
  if (selectionTimer) clearTimeout(selectionTimer)

  selectionTimer = setTimeout(() => {
    selectionMessage.value = ''
  }, 3000)
}

// 정보 수정
function handleEditInfo() {
  const userBorrowed = itemStore.getUserBorrowedItems(
    authStore.currentUser.studentId
  )

  if (userBorrowed.length > 0) {
    modalTitle.value = '정보 수정 불가'
    modalMessage.value = '대여 중인 물품이 있어 정보를 수정할 수 없습니다.\n먼저 모든 물품을 반납해주세요.'
    modalShowCancel.value = false
    modalAction.value = null
    showModal.value = true
  } else {
    authStore.logout()
    router.push('/')
  }
}

// 완료
function handleFinish() {
  const userBorrowed = itemStore.getUserBorrowedItems(
    authStore.currentUser.studentId
  )

  let message = ''
  if (userBorrowed.length > 0) {
    message = `📋 대여 내역 확인\n\n`
    message += `👤 ${authStore.currentUser.name} (${authStore.currentUser.studentId})\n\n`
    message += `📦 대여 중인 물품:\n`
    userBorrowed.forEach(record => {
      message += `• ${record.itemName} (반납: ${record.dueLabel.replace(
        ' 18:00',
        ''
      )})\n`
    })
    message += `\n✅ 위 내용을 확인했습니다.`
  } else {
    message = '이용해 주셔서 감사합니다!'
  }

  modalTitle.value = '완료'
  modalMessage.value = message
  modalShowCancel.value = false
  modalAction.value = 'finish'
  showModal.value = true
}

// 모달 확인
function handleModalConfirm() {
  if (modalAction.value === 'finish') {
    authStore.logout()
    router.push('/')
  }
}

// 모달 취소
function handleModalCancel() {
  // Nothing to do
}

// 드래그 기능
function startDrag(e, type) {
  dragging.value = type
  const rect = userCard.value.getBoundingClientRect()
  dragOffset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!dragging.value) return

  const x = e.clientX - dragOffset.value.x
  const y = e.clientY - dragOffset.value.y

  userPopupPosition.value = {
    top: `${y}px`,
    left: `${x}px`
  }
}

function stopDrag() {
  dragging.value = null
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  // 타이머 시작
  authStore.startAutoLogoutTimer()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  authStore.stopAutoLogoutTimer()
})

// 자동 로그아웃 감지
watch(
  () => authStore.currentUser,
  (newUser) => {
    if (!newUser) {
      router.push('/')
    }
  }
)
</script>

<style scoped>
.kiosk {
  width: min(1200px, calc(100vw - 500px));
  max-width: 1200px;
  height: calc(100vh - 40px);
  max-height: calc(100vh - 40px);
  padding: 40px 36px 48px;
  background: #1c1f28;
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

#step-items {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.step-title {
  font-weight: 700;
  margin-bottom: 16px;
  color: #cbd3ff;
  letter-spacing: 0.04em;
  font-size: 1.3rem;
}

.filter-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.filter-buttons button {
  padding: 12px 24px;
  border-radius: 16px;
  border: 1px solid #2c3242;
  background: #11131c;
  color: #b5c0d0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-buttons button.active {
  background: #4e5fe5;
  color: #fff;
  border-color: #4e5fe5;
}

.item-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
}

.item-grid::-webkit-scrollbar {
  width: 8px;
}

.item-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.item-grid::-webkit-scrollbar-thumb {
  background: rgba(97, 125, 255, 0.5);
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.actions button {
  flex: 1;
  padding: 20px 36px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.3rem;
}

.btn-primary {
  background: linear-gradient(135deg, #617dff, #4e5fe5);
  color: #fff;
}

.btn-secondary {
  background: #252836;
  color: #e0e4ff;
}

.actions button:active {
  transform: scale(0.98);
}

/* 사용자 정보 팝업 */
.user-info-popup {
  position: fixed;
  z-index: 1200;
  pointer-events: none;
}

.user-info-card {
  pointer-events: auto;
  max-width: 450px;
  width: min(450px, 90vw);
  background: #1c1f28;
  border: 1px solid #2c3242;
  border-radius: 18px;
  padding: 22px 24px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  color: #f4f4f8;
  cursor: move;
  user-select: none;
  position: relative;
  font-size: 0.95rem;
  line-height: 1.5;
}

.camera-section {
  margin-top: 14px;
  border-radius: 12px;
  overflow: hidden;
}

.user-info-card::before {
  content: '⋮⋮';
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1;
  cursor: move;
}

/* 선택 결과 팝업 */
#selectionResult {
  position: fixed !important;
  bottom: 20px;
  left: 20px;
  width: 450px;
  max-width: 450px;
  z-index: 2000 !important;
  padding: 28px !important;
  font-size: 1.2rem !important;
  line-height: 1.6 !important;
  border-radius: 20px;
  background: rgba(97, 125, 255, 0.08);
  border: 1px solid rgba(97, 125, 255, 0.25);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
