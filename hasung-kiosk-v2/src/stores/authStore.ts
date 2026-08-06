import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'
import { validateUser } from '../utils/validation'
import { AUTO_LOGOUT_TIMEOUT } from '../utils/constants'
import { useItemStore } from './itemStore'

export const useAuthStore = defineStore('auth', () => {
  // 상태
  const currentUser = ref<User | null>(null)
  const isAdmin = ref(false)
  const cameraConsent = ref(false)
  const autoLogoutTimer = ref<ReturnType<typeof setTimeout> | null>(null)

  // 사용자 로그인
  function login(name: string, studentId: string, phone: string): User {
    const validation = validateUser(name, studentId, phone)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    currentUser.value = {
      name: name.trim(),
      studentId: studentId.trim(),
      phone: phone.trim()
    }

    // 로그인 로그 추가
    const itemStore = useItemStore()
    itemStore.addLoginLog(currentUser.value)

    // 자동 로그아웃 타이머 시작
    startAutoLogoutTimer()

    return currentUser.value
  }

  // 사용자 로그아웃
  function logout(): void {
    currentUser.value = null
    cameraConsent.value = false
    stopAutoLogoutTimer()
  }

  // 관리자 로그인
  // 평문 비밀번호 비교는 제거됨 — v2 에는 아직 서버 연동 계층이 없으므로 인증은 fail-closed 상태다.
  // TODO: 루트 앱(js/script.js)의 verifyPasswordOnServer 와 동일하게 Apps Script 의
  //       doPost verifyAdmin 액션을 호출하도록 API 계층을 추가한 뒤 이 함수를 async 로 전환할 것.
  function adminLogin(_password: string): boolean {
    throw new Error('관리자 인증이 아직 서버와 연결되지 않았습니다')
  }

  // 관리자 로그아웃
  function adminLogout(): void {
    isAdmin.value = false
  }

  // 자동 로그아웃 타이머 시작
  function startAutoLogoutTimer(): void {
    stopAutoLogoutTimer() // 기존 타이머 제거

    autoLogoutTimer.value = setTimeout(() => {
      if (currentUser.value) {
        logout()
      }
    }, AUTO_LOGOUT_TIMEOUT)
  }

  // 자동 로그아웃 타이머 중지
  function stopAutoLogoutTimer(): void {
    if (autoLogoutTimer.value) {
      clearTimeout(autoLogoutTimer.value)
      autoLogoutTimer.value = null
    }
  }

  // 타이머 리셋 (활동 감지 시)
  function resetAutoLogoutTimer(): void {
    if (currentUser.value) {
      startAutoLogoutTimer()
    }
  }

  return {
    // 상태
    currentUser,
    isAdmin,
    cameraConsent,
    // Actions
    login,
    logout,
    adminLogin,
    adminLogout,
    startAutoLogoutTimer,
    stopAutoLogoutTimer,
    resetAutoLogoutTimer
  }
})
