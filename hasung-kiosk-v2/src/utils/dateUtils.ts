// 반납 기한·연체 계산
// 규칙은 루트 정적 앱(js/script.js)의 getDueInfo 와 동일하게 유지한다.
import type { DueInfo } from '../types'
import { FINE_PER_DAY } from './constants'

const WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

// 반납 기한 계산
// 금요일 대여 → 다음 주 월요일, 토요일 대여 → 다음 주 월요일, 그 외 → 다음 날. 모두 18:00 기준.
export function getDueInfo(from: Date = new Date()): DueInfo {
  const day = from.getDay()
  const due = new Date(from)

  if (day === 5) {
    due.setDate(due.getDate() + 3) // 금 → 월
  } else if (day === 6) {
    due.setDate(due.getDate() + 2) // 토 → 월
  } else {
    due.setDate(due.getDate() + 1)
  }
  due.setHours(18, 0, 0, 0)

  return {
    date: due,
    label: `${due.getMonth() + 1}/${due.getDate()}(${WEEKDAY_NAMES[due.getDay()]}) 18:00`,
    isWeekendPenalty: day <= 4 // 월~목
  }
}

// 기한 초과 여부
export function isOverdue(dueDate: string | Date, now: Date = new Date()): boolean {
  return now.getTime() > new Date(dueDate).getTime()
}

// 연체 일수 (기한 이전이면 0)
export function calculateOverdueDays(dueDate: string | Date, now: Date = new Date()): number {
  const diffMs = now.getTime() - new Date(dueDate).getTime()
  if (diffMs <= 0) return 0
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

// 연체 벌금 (1일당 FINE_PER_DAY 원)
export function calculateFine(dueDate: string | Date, now: Date = new Date()): number {
  return calculateOverdueDays(dueDate, now) * FINE_PER_DAY
}

// 로그 표시용 시각 포맷
export function formatTime(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${date.getMonth() + 1}/${date.getDate()} ${hh}:${mm}`
}
