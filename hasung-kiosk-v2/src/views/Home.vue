<template>
  <div class="kiosk">
    <div id="step-user">
      <h1>복지물품 대여 시스템</h1>
      <p>학번, 이름, 연락처를 입력하여 시작하세요</p>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="name">이름</label>
          <input
            id="name"
            v-model="name"
            type="text"
            autocomplete="name"
            required
            autofocus
          />
        </div>

        <div class="field">
          <label for="studentId">학번 (10자리 숫자)</label>
          <input
            id="studentId"
            v-model="studentId"
            type="tel"
            inputmode="numeric"
            maxlength="10"
            required
          />
          <div v-if="studentIdError" class="error">{{ studentIdError }}</div>
        </div>

        <div class="field">
          <label for="phone">전화번호 ('-' 없이 11자리)</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            inputmode="numeric"
            maxlength="11"
            required
          />
          <div v-if="phoneError" class="error">{{ phoneError }}</div>
        </div>

        <div class="consent-field">
          <label class="consent-label">
            <input
              type="checkbox"
              v-model="cameraConsent"
              class="consent-checkbox"
            />
            <span class="consent-text">
              개인정보 수집에 동의합니다
              <span class="consent-desc">(물품 관리 목적으로 이용 장면이 촬영됩니다)</span>
            </span>
          </label>
        </div>

        <button type="submit" class="btn-primary" :disabled="!cameraConsent">다음</button>
      </form>
    </div>

    <!-- CCTV 안내 팝업 -->
    <div class="cctv-modal" :style="cctvPopupPosition">
      <div class="cctv-card" ref="cctvCard" @mousedown="startDrag($event, 'cctv')">
        <span class="icon">📹</span>
        <div>
          <div class="title">CCTV 녹화 중</div>
          <div class="desc">
            본 키오스크는 보안을 위해 24시간 녹화되고 있습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { validateStudentId, validatePhone } from '../utils/validation'

const router = useRouter()
const authStore = useAuthStore()

// 폼 데이터
const name = ref('')
const studentId = ref('')
const phone = ref('')
const studentIdError = ref('')
const phoneError = ref('')
const cameraConsent = ref(false)

// 드래그 관련
const cctvPopupPosition = ref({ top: '20px', left: '450px' })
const cctvCard = ref(null)
const dragging = ref(null)
const dragOffset = ref({ x: 0, y: 0 })

function handleSubmit() {
  // 에러 초기화
  studentIdError.value = ''
  phoneError.value = ''

  // 학번 검증
  const studentIdValidation = validateStudentId(studentId.value.trim())
  if (!studentIdValidation.valid) {
    studentIdError.value = studentIdValidation.error
    return
  }

  // 전화번호 검증
  const phoneValidation = validatePhone(phone.value.trim())
  if (!phoneValidation.valid) {
    phoneError.value = phoneValidation.error
    return
  }

  // 로그인
  try {
    authStore.cameraConsent = cameraConsent.value
    authStore.login(name.value, studentId.value, phone.value)
    router.push('/items')
  } catch (error) {
    alert(error.message)
  }
}

// 드래그 기능
function startDrag(e, type) {
  dragging.value = type
  const rect = cctvCard.value.getBoundingClientRect()
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

  cctvPopupPosition.value = {
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
  // 로그아웃 처리 (이전 세션 정리)
  authStore.logout()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
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

#step-user {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 20px 0;
}

#step-user form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 24px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.field {
  margin-bottom: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-primary {
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #617dff, #4e5fe5);
  color: #fff;
  border: none;
  font-size: 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  font-weight: 600;
}

.btn-primary:active {
  transform: scale(0.98);
  box-shadow: 0 10px 24px rgba(78, 95, 229, 0.4);
}

/* 개인정보 동의 */
.consent-field {
  margin-top: 4px;
}

.consent-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  padding: 16px;
  border-radius: 14px;
  background: rgba(97, 125, 255, 0.06);
  border: 1px solid #2c3242;
  transition: all 0.2s ease;
}

.consent-label:hover {
  border-color: rgba(97, 125, 255, 0.4);
}

.consent-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  accent-color: #617dff;
  cursor: pointer;
  flex-shrink: 0;
}

.consent-text {
  color: #e0e4ff;
  font-size: 1rem;
  line-height: 1.5;
}

.consent-desc {
  display: block;
  color: #8890a8;
  font-size: 0.88rem;
  margin-top: 2px;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* CCTV 팝업 */
.cctv-modal {
  position: fixed;
  z-index: 1200;
  pointer-events: none;
}

.cctv-card {
  pointer-events: auto;
  max-width: 420px;
  width: min(420px, 90vw);
  background: #11131c;
  border: 1px solid rgba(255, 215, 0, 0.35);
  border-radius: 18px;
  padding: 22px 24px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  color: #ffd876;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  line-height: 1.5;
  cursor: move;
  user-select: none;
  position: relative;
}

.cctv-card::before {
  content: '⋮⋮';
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.2rem;
  color: rgba(255, 215, 0, 0.5);
  line-height: 1;
  cursor: move;
}

.cctv-card .icon {
  font-size: 1.6rem;
}

.cctv-card .title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #ffe59a;
}

.cctv-card .desc {
  font-size: 1.05rem;
  color: #ffe8b8;
}
</style>
