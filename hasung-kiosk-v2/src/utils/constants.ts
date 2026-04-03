// 상수 정의
import type { Item } from '../types'

export const ADMIN_PASSWORD: string = '041104'

// 허용된 학과 식별번호
// 신입생: 402-컴정공, 403-소프트, 404-정융, 405/406-로봇
// 고학번: 202-컴정공, 203-소프트, 204-정융, 205-로봇
export const VALID_DEPARTMENT_CODES: readonly string[] = ['202', '203', '204', '205', '402', '403', '404', '405', '406'] as const

// 정규식
export const STUDENT_ID_REGEX: RegExp = /^\d{10}$/
export const PHONE_REGEX: RegExp = /^\d{11}$/

// 벌금 설정
export const FINE_PER_DAY: number = 2000 // 1일당 벌금 (원)

// 자동 로그아웃 시간 (밀리초)
export const AUTO_LOGOUT_TIMEOUT: number = 60000 // 60초

// 디바운스 시간 (밀리초)
export const DEBOUNCE_TIME: number = 400

// 기본 물품 데이터
export const DEFAULT_ITEMS: Item[] = [
  { name: '우산', type: '대여', stock: 7, notice: '비 오는 날 사용 후 충분히 말려서 반납', icon: '🌂' },
  { name: '충전기', type: '대여', stock: 5, notice: '케이블 손상 시 즉시 관리자에게 보고', icon: '🔌' },
  { name: 'USB 허브', type: '대여', stock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '🔗' },
  { name: 'USB 허브 C타입', type: '대여', stock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '💻' },
  { name: '농구공', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🏀' },
  { name: '풋살볼', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽' },
  { name: '피구공', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🔴' },
  { name: '공', type: '대여', stock: 4, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽' },
  { name: '담요', type: '대여', stock: 2, notice: '음식물·화장품 묻지 않게 주의', icon: '🛏️' },
  { name: '핫팩', type: '소모품', stock: 20, notice: '개봉 후 재활용 불가, 즉시 폐기', icon: '🔥' },
  { name: '마스크', type: '소모품', stock: 50, notice: '1인 1개 제한', icon: '😷' }
]
