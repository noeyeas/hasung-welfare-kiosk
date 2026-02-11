// IndexedDB 초기화 및 유틸리티 함수

const DB_NAME = 'HasungKioskDB'
const DB_VERSION = 2

let db: IDBDatabase | null = null

// DB 초기화
export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result

      // 물품 스토어
      if (!database.objectStoreNames.contains('items')) {
        const itemStore = database.createObjectStore('items', { keyPath: 'name' })
        itemStore.createIndex('type', 'type', { unique: false })
      }

      // 대여 기록 스토어
      if (!database.objectStoreNames.contains('borrowed')) {
        const borrowStore = database.createObjectStore('borrowed', {
          keyPath: 'id',
          autoIncrement: true
        })
        borrowStore.createIndex('studentId', 'studentId', { unique: false })
        borrowStore.createIndex('itemName', 'itemName', { unique: false })
        borrowStore.createIndex('dueDate', 'dueDate', { unique: false })
      }

      // 변경 로그 스토어
      if (!database.objectStoreNames.contains('changeLogs')) {
        database.createObjectStore('changeLogs', {
          keyPath: 'id',
          autoIncrement: true
        })
      }

      // 로그인 로그 스토어
      if (!database.objectStoreNames.contains('loginLogs')) {
        database.createObjectStore('loginLogs', {
          keyPath: 'id',
          autoIncrement: true
        })
      }

      // 카메라 촬영 기록 스토어
      if (!database.objectStoreNames.contains('cameraRecords')) {
        const cameraStore = database.createObjectStore('cameraRecords', {
          keyPath: 'id',
          autoIncrement: true
        })
        cameraStore.createIndex('studentId', 'studentId', { unique: false })
        cameraStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// DB 가져오기
export function getDB(): IDBDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.')
  }
  return db
}

// 모든 데이터 가져오기
export async function getAllFromStore<T>(storeName: string): Promise<T[]> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result as T[])
    request.onerror = () => reject(request.error)
  })
}

// 단일 데이터 가져오기
export async function getFromStore<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onsuccess = () => resolve(request.result as T | undefined)
    request.onerror = () => reject(request.error)
  })
}

// 데이터 저장/업데이트
export async function saveToStore<T>(storeName: string, data: T): Promise<IDBValidKey> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(data)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 데이터 삭제
export async function deleteFromStore(storeName: string, key: IDBValidKey): Promise<void> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// 스토어 전체 삭제
export async function clearStore(storeName: string): Promise<void> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// 인덱스로 검색
export async function getByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
  const database = getDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const index = store.index(indexName)
    const request = index.getAll(value)

    request.onsuccess = () => resolve(request.result as T[])
    request.onerror = () => reject(request.error)
  })
}
