// 물품 타입
export interface Item {
  name: string
  type: '대여' | '소모품'
  stock: number
  notice: string
  icon: string
}

// 사용자 타입
export interface User {
  name: string
  studentId: string
  phone: string
}

// 대여 기록 타입
export interface BorrowRecord {
  id?: number
  studentId: string
  name: string
  phone: string
  itemName: string
  dueLabel: string
  dueDate: string
  borrowedAt: string
}

// 변경 로그 타입
export interface ChangeLog {
  id?: number
  time: string
  action: string
  details: string
}

// 로그인 로그 타입
export interface LoginLog {
  id?: number
  time: string
  name: string
  studentId: string
  phone: string
}

// 반납 기한 정보 타입
export interface DueInfo {
  date: Date
  label: string
  isWeekendPenalty: boolean
}

// 검증 결과 타입
export interface ValidationResult {
  valid: boolean
  error: string
}

// 카메라 촬영 기록 타입
export interface CameraRecord {
  id?: number
  studentId: string
  name: string
  action: string
  videoBlob: Blob
  timestamp: string
}
