// 입력값 검증
// 규칙은 루트 정적 앱(js/script.js)의 검증 함수와 동일하게 유지한다.
import type { ValidationResult } from '../types'
import { STUDENT_ID_REGEX, PHONE_REGEX, VALID_DEPARTMENT_CODES } from './constants'

const NAME_REGEX = /^[가-힣a-zA-Z\s]{2,20}$/ // 한글·영문·공백만, 2~20자

export function validateName(name: string): ValidationResult {
  const trimmed = (name || '').trim()
  if (!trimmed) {
    return { valid: false, error: '이름을 입력해주세요' }
  }
  if (!NAME_REGEX.test(trimmed)) {
    return { valid: false, error: '이름은 한글 또는 영문 2~20자로 입력해주세요' }
  }
  return { valid: true, error: '' }
}

export function validateStudentId(studentId: string): ValidationResult {
  const trimmed = (studentId || '').trim()
  if (!trimmed) {
    return { valid: false, error: '학번을 입력해주세요' }
  }
  if (!STUDENT_ID_REGEX.test(trimmed)) {
    return { valid: false, error: '학번은 숫자 10자리로 입력해주세요' }
  }
  // 5~7번째 자리가 학과 식별번호
  const departmentCode = trimmed.slice(4, 7)
  if (!VALID_DEPARTMENT_CODES.includes(departmentCode)) {
    return { valid: false, error: '인공지능융합대학 소속 학번이 아닙니다' }
  }
  return { valid: true, error: '' }
}

export function validatePhone(phone: string): ValidationResult {
  const trimmed = (phone || '').trim()
  if (!trimmed) {
    return { valid: false, error: '연락처를 입력해주세요' }
  }
  if (!PHONE_REGEX.test(trimmed)) {
    return { valid: false, error: '연락처는 하이픈 없이 숫자 11자리로 입력해주세요' }
  }
  if (!trimmed.startsWith('010')) {
    return { valid: false, error: '010으로 시작하는 번호를 입력해주세요' }
  }
  return { valid: true, error: '' }
}

// 세 항목을 한 번에 검증 — 첫 실패 사유를 반환
export function validateUser(name: string, studentId: string, phone: string): ValidationResult {
  const checks = [validateName(name), validateStudentId(studentId), validatePhone(phone)]
  const failed = checks.find(result => !result.valid)
  return failed || { valid: true, error: '' }
}
