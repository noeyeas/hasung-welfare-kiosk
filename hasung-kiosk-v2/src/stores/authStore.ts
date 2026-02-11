import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'
import { validateUser } from '../utils/validation'
import { ADMIN_PASSWORD, AUTO_LOGOUT_TIMEOUT } from '../utils/constants'
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
  function adminLogin(password: string): boolean {
    if (password !== ADMIN_PASSWORD) {
      throw new Error('비밀번호가 올바르지 않습니다')
    }
    isAdmin.value = true
    return true
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
