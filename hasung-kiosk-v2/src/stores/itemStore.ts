import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Item, BorrowRecord, ChangeLog, LoginLog, User, CameraRecord } from '../types'
import {
  initDB,
  getAllFromStore,
  saveToStore,
  deleteFromStore,
  clearStore
} from '../utils/database'
import { DEFAULT_ITEMS } from '../utils/constants'
import { getDueInfo, isOverdue } from '../utils/dateUtils'

export const useItemStore = defineStore('items', () => {
  // 상태
  const items = ref<Item[]>([])
  const borrowedRecords = ref<BorrowRecord[]>([])
  const changeLogs = ref<ChangeLog[]>([])
  const loginLogs = ref<LoginLog[]>([])
  const cameraRecords = ref<CameraRecord[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const availableItems = computed(() => {
    return items.value.filter(item => item.stock > 0)
  })

  const overdueRecords = computed(() => {
    return borrowedRecords.value.filter(record => isOverdue(record.dueDate))
  })

  const overdueCount = computed(() => {
    const overdueStudents = new Set<string>()
    overdueRecords.value.forEach(record => {
      overdueStudents.add(record.studentId)
    })
    return overdueStudents.size
  })

  // DB 초기화 및 데이터 로드
  async function initialize(): Promise<void> {
    try {
      isLoading.value = true
      await initDB()
      await loadAllData()

      // 데이터가 없으면 기본 데이터 생성
      if (items.value.length === 0) {
        await initializeDefaultItems()
      }
    } catch (e) {
      error.value = (e as Error).message
      console.error('초기화 실패:', e)
    } finally {
      isLoading.value = false
    }
  }

  // 모든 데이터 로드
  async function loadAllData(): Promise<void> {
    try {
      items.value = await getAllFromStore<Item>('items')
      borrowedRecords.value = await getAllFromStore<BorrowRecord>('borrowed')
      changeLogs.value = await getAllFromStore<ChangeLog>('changeLogs')
      loginLogs.value = await getAllFromStore<LoginLog>('loginLogs')
      cameraRecords.value = await getAllFromStore<CameraRecord>('cameraRecords')
    } catch (e) {
      console.error('데이터 로드 실패:', e)
      throw e
    }
  }

  // 기본 물품 데이터 초기화
  async function initializeDefaultItems(): Promise<void> {
    try {
      for (const item of DEFAULT_ITEMS) {
        await saveToStore('items', item)
      }
      await loadAllData()
    } catch (e) {
      console.error('기본 물품 초기화 실패:', e)
    }
  }

  // 물품 대여
  async function borrowItem(itemName: string, user: User): Promise<boolean> {
    try {
      const item = items.value.find(i => i.name === itemName)
      if (!item) throw new Error('물품을 찾을 수 없습니다')
      if (item.stock <= 0) throw new Error('재고가 부족합니다')

      // 재고 감소
      item.stock -= 1
      await saveToStore('items', item)

      // 대여 기록 추가
      const dueInfo = getDueInfo()
      const record: Omit<BorrowRecord, 'id'> = {
        studentId: user.studentId,
        name: user.name,
        phone: user.phone,
        itemName: itemName,
        dueLabel: dueInfo.label,
        dueDate: dueInfo.date.toISOString(),
        borrowedAt: new Date().toISOString()
      }
      await saveToStore('borrowed', record)

      // 변경 로그 추가
      await addChangeLog('대여', `${user.name}(${user.studentId})이(가) ${itemName}을(를) 대여`)

      await loadAllData()
      return true
    } catch (e) {
      console.error('대여 실패:', e)
      throw e
    }
  }

  // 물품 반납
  async function returnItem(itemName: string, user: User): Promise<boolean> {
    try {
      const item = items.value.find(i => i.name === itemName)
      if (!item) throw new Error('물품을 찾을 수 없습니다')

      // 대여 기록 찾기
      const recordIndex = borrowedRecords.value.findIndex(
        r => r.studentId === user.studentId && r.itemName === itemName
      )
      if (recordIndex === -1) throw new Error('대여 기록을 찾을 수 없습니다')

      const record = borrowedRecords.value[recordIndex]

      // 재고 증가
      item.stock += 1
      await saveToStore('items', item)

      // 대여 기록 삭제
      if (record.id !== undefined) {
        await deleteFromStore('borrowed', record.id)
      }

      // 변경 로그 추가
      await addChangeLog('반납', `${user.name}(${user.studentId})이(가) ${itemName}을(를) 반납`)

      await loadAllData()
      return true
    } catch (e) {
      console.error('반납 실패:', e)
      throw e
    }
  }

  // 소모품 수령
  async function consumeItem(itemName: string, user: User): Promise<boolean> {
    try {
      const item = items.value.find(i => i.name === itemName)
      if (!item) throw new Error('물품을 찾을 수 없습니다')
      if (item.stock <= 0) throw new Error('재고가 부족합니다')

      // 재고 감소만
      item.stock -= 1
      await saveToStore('items', item)

      // 변경 로그 추가
      await addChangeLog('소모품 수령', `${user.name}(${user.studentId})이(가) ${itemName}을(를) 수령`)

      await loadAllData()
      return true
    } catch (e) {
      console.error('소모품 수령 실패:', e)
      throw e
    }
  }

  // 강제 반납 (관리자)
  async function forceReturn(studentId: string, itemName: string, dueDate: string): Promise<boolean> {
    try {
      const item = items.value.find(i => i.name === itemName)
      if (!item) throw new Error('물품을 찾을 수 없습니다')

      // 대여 기록 찾기
      const recordIndex = borrowedRecords.value.findIndex(
        r => r.studentId === studentId && r.itemName === itemName && r.dueDate === dueDate
      )
      if (recordIndex === -1) throw new Error('대여 기록을 찾을 수 없습니다')

      const record = borrowedRecords.value[recordIndex]

      // 재고 증가
      item.stock += 1
      await saveToStore('items', item)

      // 대여 기록 삭제
      if (record.id !== undefined) {
        await deleteFromStore('borrowed', record.id)
      }

      // 변경 로그 추가
      await addChangeLog('강제 반납', `${record.name}(${record.studentId})의 ${itemName} 강제 반납 처리`)

      await loadAllData()
      return true
    } catch (e) {
      console.error('강제 반납 실패:', e)
      throw e
    }
  }

  // 재고 수정 (관리자)
  async function updateStock(itemName: string, newStock: number): Promise<boolean> {
    try {
      const item = items.value.find(i => i.name === itemName)
      if (!item) throw new Error('물품을 찾을 수 없습니다')

      const oldStock = item.stock
      item.stock = newStock
      await saveToStore('items', item)

      // 변경 로그 추가
      await addChangeLog('재고 변경', `${itemName}: ${oldStock}개 → ${newStock}개`)

      await loadAllData()
      return true
    } catch (e) {
      console.error('재고 수정 실패:', e)
      throw e
    }
  }

  // 물품 추가 (관리자)
  async function addItem(itemData: Item): Promise<boolean> {
    try {
      await saveToStore('items', itemData)
      await addChangeLog('물품 추가', `새 물품 추가: ${itemData.name}`)
      await loadAllData()
      return true
    } catch (e) {
      console.error('물품 추가 실패:', e)
      throw e
    }
  }

  // 물품 삭제 (관리자)
  async function deleteItem(itemName: string): Promise<boolean> {
    try {
      await deleteFromStore('items', itemName)
      await addChangeLog('물품 삭제', `물품 삭제: ${itemName}`)
      await loadAllData()
      return true
    } catch (e) {
      console.error('물품 삭제 실패:', e)
      throw e
    }
  }

  // 변경 로그 추가
  async function addChangeLog(action: string, details: string): Promise<void> {
    try {
      const log: Omit<ChangeLog, 'id'> = {
        time: new Date().toISOString(),
        action,
        details
      }
      await saveToStore('changeLogs', log)
      changeLogs.value.push(log as ChangeLog)
    } catch (e) {
      console.error('로그 추가 실패:', e)
    }
  }

  // 로그인 로그 추가
  async function addLoginLog(user: User): Promise<void> {
    try {
      const log: Omit<LoginLog, 'id'> = {
        time: new Date().toISOString(),
        name: user.name,
        studentId: user.studentId,
        phone: user.phone
      }
      await saveToStore('loginLogs', log)
      loginLogs.value.push(log as LoginLog)
    } catch (e) {
      console.error('로그인 로그 추가 실패:', e)
    }
  }

  // 카메라 촬영 기록 저장
  async function saveCameraRecord(user: User, action: string, videoBlob: Blob): Promise<void> {
    try {
      const record: Omit<CameraRecord, 'id'> = {
        studentId: user.studentId,
        name: user.name,
        action,
        videoBlob,
        timestamp: new Date().toISOString()
      }
      await saveToStore('cameraRecords', record)
      cameraRecords.value.push(record as CameraRecord)
    } catch (e) {
      console.error('촬영 기록 저장 실패:', e)
    }
  }

  // 사용자의 대여 기록 조회
  function getUserBorrowedItems(studentId: string): BorrowRecord[] {
    return borrowedRecords.value.filter(r => r.studentId === studentId)
  }

  // 전체 데이터 초기화 (관리자)
  async function resetAllData(): Promise<boolean> {
    try {
      await clearStore('items')
      await clearStore('borrowed')
      await clearStore('changeLogs')
      await clearStore('loginLogs')
      await clearStore('cameraRecords')
      await initializeDefaultItems()
      await addChangeLog('시스템', '전체 데이터 초기화')
      return true
    } catch (e) {
      console.error('데이터 초기화 실패:', e)
      throw e
    }
  }

  return {
    // 상태
    items,
    borrowedRecords,
    changeLogs,
    loginLogs,
    cameraRecords,
    isLoading,
    error,
    // Computed
    availableItems,
    overdueRecords,
    overdueCount,
    // Actions
    initialize,
    loadAllData,
    borrowItem,
    returnItem,
    consumeItem,
    forceReturn,
    updateStock,
    addItem,
    deleteItem,
    addChangeLog,
    addLoginLog,
    saveCameraRecord,
    getUserBorrowedItems,
    resetAllData
  }
})
