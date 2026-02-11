<template>
  <div class="kiosk">
    <div v-if="!isAuthenticated" class="admin-login">
      <h1>관리자 모드</h1>
      <p>비밀번호를 입력하세요</p>
      <form @submit.prevent="handleLogin">
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          autofocus
        />
        <div v-if="loginError" class="error">{{ loginError }}</div>
        <button type="submit" class="btn-primary">로그인</button>
      </form>
      <button @click="router.push('/')" class="btn-secondary" style="margin-top: 16px">
        돌아가기
      </button>
    </div>

    <div v-else class="admin-panel">
      <div class="admin-header">
        <h1>관리자 패널</h1>
        <button @click="handleLogout" class="btn-secondary">로그아웃</button>
      </div>

      <!-- 통계 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">전체 물품</div>
          <div class="stat-value">{{ itemStore.items.length }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">대여 중</div>
          <div class="stat-value">{{ itemStore.borrowedRecords.length }}</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">연체자</div>
          <div class="stat-value">{{ itemStore.overdueCount }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">촬영 기록</div>
          <div class="stat-value">{{ itemStore.cameraRecords.length }}</div>
        </div>
      </div>

      <!-- 탭 -->
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'stock' }"
          @click="activeTab = 'stock'"
        >
          재고 관리
        </button>
        <button
          :class="{ active: activeTab === 'borrowed' }"
          @click="activeTab = 'borrowed'"
        >
          대여 현황
        </button>
        <button
          :class="{ active: activeTab === 'overdue' }"
          @click="activeTab = 'overdue'"
        >
          연체 관리
        </button>
        <button
          :class="{ active: activeTab === 'camera' }"
          @click="activeTab = 'camera'"
        >
          촬영 기록
        </button>
      </div>

      <!-- 재고 관리 -->
      <div v-if="activeTab === 'stock'" class="tab-content">
        <div class="admin-data-table">
          <table>
            <thead>
              <tr>
                <th>물품</th>
                <th>유형</th>
                <th>재고</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemStore.items" :key="item.name">
                <td>{{ item.icon }} {{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>
                  <input
                    type="number"
                    :value="item.stock"
                    @change="updateStock(item.name, $event.target.value)"
                    min="0"
                    style="width: 80px; padding: 8px;"
                  />
                </td>
                <td>
                  <button
                    @click="deleteItem(item.name)"
                    class="btn-danger"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 대여 현황 -->
      <div v-if="activeTab === 'borrowed'" class="tab-content">
        <div class="admin-data-table">
          <table>
            <thead>
              <tr>
                <th>물품</th>
                <th>학번</th>
                <th>이름</th>
                <th>연락처</th>
                <th>반납 기한</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in itemStore.borrowedRecords" :key="record.id">
                <td>{{ record.itemName }}</td>
                <td>{{ record.studentId }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.phone }}</td>
                <td :style="{ color: isOverdue(record.dueDate) ? '#ff8f8f' : '' }">
                  {{ record.dueLabel.replace(' 18:00', '') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 연체 관리 -->
      <div v-if="activeTab === 'overdue'" class="tab-content">
        <div class="admin-data-table">
          <table>
            <thead>
              <tr>
                <th>물품</th>
                <th>학번</th>
                <th>이름</th>
                <th>연락처</th>
                <th>반납 기한</th>
                <th>연체 일수</th>
                <th>벌금</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in itemStore.overdueRecords" :key="record.id">
                <td>{{ record.itemName }}</td>
                <td>{{ record.studentId }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.phone }}</td>
                <td style="color: #ff8f8f">
                  {{ record.dueLabel.replace(' 18:00', '') }}
                </td>
                <td style="color: #ff8f8f; font-weight: 600">
                  {{ calculateOverdueDays(record.dueDate) }}일
                </td>
                <td style="color: #ff8f8f; font-weight: 600">
                  {{ calculateFine(record.dueDate).toLocaleString() }}원
                </td>
                <td>
                  <button
                    @click="forceReturn(record)"
                    class="btn-primary-small"
                  >
                    강제 반납
                  </button>
                </td>
              </tr>
              <tr v-if="itemStore.overdueRecords.length === 0">
                <td colspan="8" style="text-align: center; color: #9ba3bf">
                  연체된 대여 기록이 없습니다
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 촬영 기록 -->
      <div v-if="activeTab === 'camera'" class="tab-content">
        <div class="admin-data-table">
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>학번</th>
                <th>이름</th>
                <th>행동</th>
                <th>영상</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in sortedCameraRecords" :key="record.id">
                <td>{{ formatCameraTime(record.timestamp) }}</td>
                <td>{{ record.studentId }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.action }}</td>
                <td>
                  <button
                    @click="playVideo(record)"
                    class="btn-primary-small"
                  >
                    재생
                  </button>
                </td>
              </tr>
              <tr v-if="itemStore.cameraRecords.length === 0">
                <td colspan="5" style="text-align: center; color: #9ba3bf">
                  촬영 기록이 없습니다
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 영상 재생 모달 -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showVideoModal" class="video-modal-overlay" @click="showVideoModal = false">
            <div class="video-modal-content" @click.stop>
              <div class="video-modal-header">
                <h3>촬영 영상</h3>
                <button @click="showVideoModal = false" class="btn-close">닫기</button>
              </div>
              <video
                ref="videoPlayer"
                controls
                autoplay
                class="video-playback"
              ></video>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <!-- 확인 모달 -->
    <Modal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="handleModalConfirm"
      @cancel="showModal = false"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useItemStore } from '../stores/itemStore'
import Modal from '../components/Modal.vue'
import { isOverdue, calculateOverdueDays, calculateFine } from '../utils/dateUtils'

const router = useRouter()
const authStore = useAuthStore()
const itemStore = useItemStore()

const password = ref('')
const loginError = ref('')
const isAuthenticated = ref(false)
const activeTab = ref('stock')

// 모달
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const modalAction = ref(null)
const modalData = ref(null)

// 영상 재생
const showVideoModal = ref(false)
const videoPlayer = ref(null)

// 촬영 기록 (최신순)
const sortedCameraRecords = computed(() => {
  return [...itemStore.cameraRecords].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
})

function handleLogin() {
  try {
    authStore.adminLogin(password.value)
    isAuthenticated.value = true
    loginError.value = ''
  } catch (error) {
    loginError.value = error.message
  }
}

function handleLogout() {
  authStore.adminLogout()
  router.push('/')
}

async function updateStock(itemName, newStock) {
  try {
    await itemStore.updateStock(itemName, parseInt(newStock))
  } catch (error) {
    alert(error.message)
  }
}

function deleteItem(itemName) {
  modalTitle.value = '물품 삭제'
  modalMessage.value = `정말로 "${itemName}"을(를) 삭제하시겠습니까?`
  modalAction.value = 'delete'
  modalData.value = itemName
  showModal.value = true
}

function forceReturn(record) {
  modalTitle.value = '강제 반납'
  modalMessage.value = `${record.name}(${record.studentId})의 "${record.itemName}"을(를) 강제 반납 처리하시겠습니까?`
  modalAction.value = 'forceReturn'
  modalData.value = record
  showModal.value = true
}

function formatCameraTime(timestamp) {
  const d = new Date(timestamp)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${month}/${day} ${hours}:${mins}`
}

async function playVideo(record) {
  showVideoModal.value = true
  await nextTick()
  if (videoPlayer.value && record.videoBlob) {
    const url = URL.createObjectURL(record.videoBlob)
    videoPlayer.value.src = url
    videoPlayer.value.onended = () => URL.revokeObjectURL(url)
  }
}

async function handleModalConfirm() {
  try {
    if (modalAction.value === 'delete') {
      await itemStore.deleteItem(modalData.value)
    } else if (modalAction.value === 'forceReturn') {
      const record = modalData.value
      await itemStore.forceReturn(record.studentId, record.itemName, record.dueDate)
    }
    showModal.value = false
  } catch (error) {
    alert(error.message)
  }
}
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
  overflow-y: auto;
  box-sizing: border-box;
}

.admin-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.admin-login form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: #11131c;
  border: 1px solid #2c3242;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}

.stat-card.warning {
  border-color: rgba(255, 143, 143, 0.3);
  background: rgba(255, 143, 143, 0.05);
}

.stat-label {
  color: #9ba3bf;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.stat-value {
  color: #f4f4f8;
  font-size: 2rem;
  font-weight: 700;
}

.stat-card.warning .stat-value {
  color: #ff8f8f;
}

.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #2c3242;
}

.tabs button {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #9ba3bf;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tabs button.active {
  color: #617dff;
  border-bottom-color: #617dff;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
}

.admin-data-table {
  background: #10121a;
  border-radius: 16px;
  border: 1px solid #2c3242;
  overflow-x: auto;
  padding: 16px;
}

.admin-data-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  color: #f6f7fb;
}

.admin-data-table th,
.admin-data-table td {
  padding: 12px;
  border: 1px solid #2c3242;
  text-align: left;
}

.admin-data-table th {
  background: #2c3242;
  color: #cbd3ff;
  font-weight: 600;
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.05rem;
}

.btn-primary {
  background: linear-gradient(135deg, #617dff, #4e5fe5);
  color: #fff;
}

.btn-secondary {
  background: #252836;
  color: #e0e4ff;
}

.btn-primary-small {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: #4e5fe5;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-danger {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: #ff5757;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

button:active {
  transform: scale(0.95);
}

/* 영상 재생 모달 */
.video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.video-modal-content {
  background: #1c1f28;
  border-radius: 24px;
  padding: 24px;
  max-width: 640px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.video-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.video-modal-header h3 {
  color: #cbd3ff;
  margin: 0;
  font-size: 1.2rem;
}

.btn-close {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: #252836;
  color: #e0e4ff;
  cursor: pointer;
  font-size: 0.9rem;
}

.video-playback {
  width: 100%;
  border-radius: 12px;
  background: #000;
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
