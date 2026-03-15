        const form = document.getElementById("user-form");
        const stepUser = document.getElementById("step-user");
        const stepItems = document.getElementById("step-items");
        const nameError = document.getElementById("nameError");
        const studentIdError = document.getElementById("studentIdError");
        const phoneError = document.getElementById("phoneError");
        const summaryBox = document.getElementById("userSummary");
        const itemGrid = document.getElementById("itemGrid");
        const selectionResult = document.getElementById("selectionResult");
        const editInfoBtn = document.getElementById("editInfo");
        const finishBtn = document.getElementById("finish");
        const logList = document.getElementById("logList");

        const stepAdmin = document.getElementById("step-admin");
        const stepOverdue = document.getElementById("step-overdue");
        const stepChangelog = document.getElementById("step-changelog");
        const adminStockTable = document.getElementById("adminStockTable");
        const adminBorrowedTable = document.getElementById("adminBorrowedTable");
        const adminBorrowedPopup = document.getElementById("adminBorrowedPopup");
        const changeLogView = document.getElementById("changeLogView");
        const overdueTable = document.getElementById("overdueTable");
        const logoutAdminBtn = document.getElementById("logoutAdmin");
        const viewOverdueBtn = document.getElementById("viewOverdue");
        const backToAdminBtn = document.getElementById("backToAdmin");
        const backFromChangelogBtn = document.getElementById("backFromChangelog");
        const confirmModal = document.getElementById("confirmModal");
        const confirmMessage = document.getElementById("confirmMessage");
        const confirmIcon = document.getElementById("confirmIcon");
        const confirmTitle = document.getElementById("confirmTitle");
        const confirmStock = document.getElementById("confirmStock");
        const confirmOk = document.getElementById("confirmOk");
        const confirmCancel = document.getElementById("confirmCancel");
        
        // 커스텀 확인 대화상자 함수
        const showConfirm = (options) => {
            return new Promise((resolve) => {
                // 옵션이 문자열이면 기존 방식 호환
                if (typeof options === 'string') {
                    options = { message: options };
                }

                const { icon, title, stock, message, autoClose } = options;

                if (confirmIcon) confirmIcon.textContent = icon || '📦';
                if (confirmTitle) confirmTitle.textContent = title || '';
                if (confirmStock) {
                    if (stock !== undefined) {
                        const stockColor = stock <= 2 ? '#ff8f8f' : stock <= 5 ? '#ffd876' : '#a0f0a0';
                        confirmStock.innerHTML = `남은 재고: <span style="color: ${stockColor}; font-weight: 700; font-size: 1.2rem;">${stock}개</span>`;
                    } else {
                        confirmStock.textContent = '';
                    }
                }
                if (confirmMessage) confirmMessage.textContent = message || '';

                // 버튼 영역 표시/숨기기
                const btnArea = confirmOk ? confirmOk.parentElement : null;
                if (btnArea) btnArea.style.display = autoClose ? 'none' : 'flex';

                if (confirmModal) {
                    confirmModal.classList.remove("hidden");
                    confirmModal.style.display = "flex";
                }

                const closeModal = (result) => {
                    if (confirmModal) {
                        confirmModal.classList.add("hidden");
                        confirmModal.style.display = "none";
                    }
                    if (confirmOk) confirmOk.removeEventListener("click", handleOk);
                    if (confirmCancel) confirmCancel.removeEventListener("click", handleCancel);
                    resolve(result);
                };

                const handleOk = () => closeModal(true);
                const handleCancel = () => closeModal(false);

                if (autoClose) {
                    setTimeout(() => closeModal(true), autoClose);
                } else {
                    if (confirmOk) confirmOk.addEventListener("click", handleOk);
                    if (confirmCancel) confirmCancel.addEventListener("click", handleCancel);
                }
            });
        };

        // ========================================
        // IndexedDB 헬퍼 함수
        // ========================================
        const DB_NAME = 'HasungKioskDB';
        const DB_VERSION = 2;
        let db = null;

        // DB 초기화
        const initDB = () => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(DB_NAME, DB_VERSION);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    db = request.result;
                    resolve(db);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;

                    // Object Stores (테이블) 생성
                    if (!db.objectStoreNames.contains('items')) {
                        db.createObjectStore('items', { keyPath: 'name' });
                    }
                    if (!db.objectStoreNames.contains('borrowed')) {
                        const borrowedStore = db.createObjectStore('borrowed', { keyPath: 'id', autoIncrement: true });
                        borrowedStore.createIndex('studentId', 'studentId', { unique: false });
                        borrowedStore.createIndex('itemName', 'itemName', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('changeLog')) {
                        const changeLogStore = db.createObjectStore('changeLog', { keyPath: 'id', autoIncrement: true });
                        changeLogStore.createIndex('time', 'time', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('loginLog')) {
                        const loginLogStore = db.createObjectStore('loginLog', { keyPath: 'id', autoIncrement: true });
                        loginLogStore.createIndex('time', 'time', { unique: false });
                    }
                    if (!db.objectStoreNames.contains('cameraRecords')) {
                        const cameraStore = db.createObjectStore('cameraRecords', { keyPath: 'id', autoIncrement: true });
                        cameraStore.createIndex('studentId', 'studentId', { unique: false });
                        cameraStore.createIndex('timestamp', 'timestamp', { unique: false });
                    }
                };
            });
        };

        // 데이터 저장 (단일)
        const saveToStore = (storeName, data) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.put(data);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        };

        // 데이터 저장 (여러 개)
        const saveAllToStore = (storeName, dataArray) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);

                // 기존 데이터 모두 삭제
                const clearRequest = store.clear();

                clearRequest.onsuccess = () => {
                    // 새 데이터 추가
                    const promises = dataArray.map(data => {
                        return new Promise((res, rej) => {
                            const request = store.put(data);
                            request.onsuccess = () => res();
                            request.onerror = () => rej(request.error);
                        });
                    });

                    Promise.all(promises)
                        .then(() => resolve())
                        .catch(reject);
                };

                clearRequest.onerror = () => reject(clearRequest.error);
            });
        };

        // 데이터 가져오기 (전체)
        const getAllFromStore = (storeName) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.getAll();

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        };

        // 데이터 가져오기 (특정 키)
        const getFromStore = (storeName, key) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readonly');
                const store = transaction.objectStore(storeName);
                const request = store.get(key);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        };

        // 데이터 삭제
        const deleteFromStore = (storeName, key) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.delete(key);

                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        };

        // 데이터 추가 (append)
        const addToStore = (storeName, data) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.add(data);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        };

        // ========================================
        // localStorage에서 IndexedDB로 마이그레이션
        const migrateFromLocalStorage = async () => {
            try {
                // items 마이그레이션
                const savedItems = localStorage.getItem('kiosk_items');
                if (savedItems) {
                    const items = JSON.parse(savedItems);
                    await saveAllToStore('items', items);
                    console.log('Items migrated to IndexedDB');
                }

                // borrowed 마이그레이션
                const savedBorrowed = localStorage.getItem('kiosk_borrowed');
                if (savedBorrowed) {
                    const borrowed = JSON.parse(savedBorrowed);
                    await saveAllToStore('borrowed', borrowed);
                    console.log('Borrowed records migrated to IndexedDB');
                }

                // changeLog 마이그레이션
                const savedChangeLog = localStorage.getItem('kiosk_change_log');
                if (savedChangeLog) {
                    const changeLog = JSON.parse(savedChangeLog);
                    await saveAllToStore('changeLog', changeLog);
                    console.log('Change log migrated to IndexedDB');
                }

                // loginLog 마이그레이션
                const savedLoginLog = localStorage.getItem('kiosk_login_log');
                if (savedLoginLog) {
                    const loginLog = JSON.parse(savedLoginLog);
                    await saveAllToStore('loginLog', loginLog);
                    console.log('Login log migrated to IndexedDB');
                }

                // 마이그레이션 완료 표시
                localStorage.setItem('migrated_to_indexeddb', 'true');
                console.log('Migration completed successfully');
            } catch (error) {
                console.error('Migration error:', error);
            }
        };

        // ========================================
        // 데이터 백업 및 복원 기능
        // ========================================

        // 백업 데이터 내보내기 (JSON 파일 다운로드)
        const exportBackup = async () => {
            try {
                const backupData = {
                    version: '1.0',
                    exportDate: new Date().toISOString(),
                    data: {
                        items: await getAllFromStore('items'),
                        borrowed: await getAllFromStore('borrowed'),
                        changeLog: await getAllFromStore('changeLog'),
                        loginLog: await getAllFromStore('loginLog')
                    }
                };

                const jsonString = JSON.stringify(backupData, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);

                const date = new Date();
                const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
                const timeStr = `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}`;
                const filename = `hasung_backup_${dateStr}_${timeStr}.json`;

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                addChangeLog("백업 내보내기", `백업 파일 다운로드: ${filename}`);
                alert(`✅ 백업이 완료되었습니다!\n파일명: ${filename}`);
                return true;
            } catch (error) {
                console.error('Backup export error:', error);
                alert('❌ 백업 내보내기에 실패했습니다.');
                return false;
            }
        };

        // 백업 데이터 가져오기 (JSON 파일 업로드)
        const importBackup = async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    try {
                        const backupData = JSON.parse(e.target.result);

                        // 버전 및 구조 검증
                        if (!backupData.data || !backupData.data.items) {
                            throw new Error('유효하지 않은 백업 파일 형식입니다.');
                        }

                        // 기존 데이터 백업 (복원 실패 시 롤백용)
                        const currentData = {
                            items: await getAllFromStore('items'),
                            borrowed: await getAllFromStore('borrowed'),
                            changeLog: await getAllFromStore('changeLog'),
                            loginLog: await getAllFromStore('loginLog')
                        };

                        try {
                            // 새 데이터로 복원
                            if (backupData.data.items && backupData.data.items.length > 0) {
                                await saveAllToStore('items', backupData.data.items);
                            }
                            if (backupData.data.borrowed) {
                                await saveAllToStore('borrowed', backupData.data.borrowed);
                            }
                            if (backupData.data.changeLog) {
                                await saveAllToStore('changeLog', backupData.data.changeLog);
                            }
                            if (backupData.data.loginLog) {
                                await saveAllToStore('loginLog', backupData.data.loginLog);
                            }

                            // 메모리 변수 업데이트
                            const newData = await loadData();
                            items.length = 0;
                            items.push(...newData.items);
                            borrowedRecords.length = 0;
                            borrowedRecords.push(...newData.borrowedRecords);
                            changeLog = await loadChangeLog();
                            loginLog = await loadLoginLog();

                            addChangeLog("백업 복원", `백업 파일에서 데이터 복원 완료 (${backupData.exportDate})`);

                            resolve({
                                success: true,
                                message: `✅ 백업이 복원되었습니다!\n\n복원된 데이터:\n- 물품: ${(backupData.data.items && backupData.data.items.length) || 0}개\n- 대여 기록: ${(backupData.data.borrowed && backupData.data.borrowed.length) || 0}개\n- 변경 로그: ${(backupData.data.changeLog && backupData.data.changeLog.length) || 0}개\n- 로그인 기록: ${(backupData.data.loginLog && backupData.data.loginLog.length) || 0}개`
                            });
                        } catch (restoreError) {
                            // 복원 실패 시 롤백
                            console.error('Restore failed, rolling back:', restoreError);
                            await saveAllToStore('items', currentData.items);
                            await saveAllToStore('borrowed', currentData.borrowed);
                            await saveAllToStore('changeLog', currentData.changeLog);
                            await saveAllToStore('loginLog', currentData.loginLog);
                            throw new Error('데이터 복원에 실패했습니다. 기존 데이터가 유지됩니다.');
                        }
                    } catch (error) {
                        reject(error);
                    }
                };

                reader.onerror = () => reject(new Error('파일을 읽을 수 없습니다.'));
                reader.readAsText(file);
            });
        };

        // 백업 파일 선택 및 가져오기
        const selectAndImportBackup = async () => {
            return new Promise((resolve) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';

                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (!file) {
                        resolve({ success: false, message: '파일이 선택되지 않았습니다.' });
                        return;
                    }

                    try {
                        const result = await importBackup(file);
                        resolve(result);
                    } catch (error) {
                        resolve({ success: false, message: `❌ ${error.message}` });
                    }
                };

                input.click();
            });
        };

        // 전역 함수로 등록
        window.exportBackup = exportBackup;
        window.importBackup = importBackup;
        window.selectAndImportBackup = selectAndImportBackup;

        // ========================================
        // 보안: 비밀번호 해싱 함수
        // ========================================
        const hashPassword = async (password) => {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        };

        // 관리자 비밀번호 해시 (SHA-256)
        // 원본: "041104"
        // 보안을 위해 해시값만 저장
        const ADMIN_PASSWORD_HASH = "de6d045537291b8c8762940084f51bd3d02055d5cbc250e6d2fc6ddb09d88325";

        // 비밀번호 검증 함수
        const verifyAdminPassword = async (inputPassword) => {
            const inputHash = await hashPassword(inputPassword);
            return inputHash === ADMIN_PASSWORD_HASH;
        };
        

        // ========================================
        // 입력값 검증 함수 (보안 강화)
        // ========================================

        const studentIdRegex = /^\d{10}$/;
        const phoneRegex = /^\d{11}$/;
        const nameRegex = /^[가-힣a-zA-Z\s]{2,20}$/; // 한글, 영문, 공백만 허용, 2-20자

        // 허용된 학과 식별번호
        // 신입생: 402-컴정공, 403-소프트, 404-정융, 405-로봇
        // 고학번: 202-컴정공, 203-소프트, 204-정융, 205-로봇
        const validDepartmentCodes = ['202', '203', '204', '205', '402', '403', '404', '405'];

        // XSS 방지: HTML 특수문자 이스케이프
        const escapeHtml = (unsafe) => {
            if (typeof unsafe !== 'string') return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        // 학번 검증 강화
        const validateStudentId = (studentId) => {
            // 1. 형식 검증 (10자리 숫자)
            if (!studentIdRegex.test(studentId)) {
                return { valid: false, message: "학번은 숫자 10자리로 입력하세요." };
            }

            // 2. 학과 코드 검증 (5~7번째 자리)
            const departmentCode = studentId.substring(4, 7);
            if (!validDepartmentCodes.includes(departmentCode)) {
                return { valid: false, message: "인공지능융합대학 학생만 이용 가능합니다." };
            }

            // 3. 입학년도 검증 (첫 4자리가 2020~2030 사이)
            const year = parseInt(studentId.substring(0, 4));
            const currentYear = new Date().getFullYear();
            if (year < 2020 || year > currentYear + 1) {
                return { valid: false, message: "유효하지 않은 학번입니다. (입학년도 확인)" };
            }

            return { valid: true, message: "" };
        };

        // 이름 검증
        const validateName = (name) => {
            if (!name || name.trim().length === 0) {
                return { valid: false, message: "이름을 입력해주세요." };
            }
            if (!nameRegex.test(name)) {
                return { valid: false, message: "이름은 한글 또는 영문 2-20자로 입력하세요." };
            }
            return { valid: true, message: "" };
        };

        // 전화번호 검증
        const validatePhone = (phone) => {
            if (!phoneRegex.test(phone)) {
                return { valid: false, message: "전화번호는 '-' 없이 11자리 숫자로 입력하세요." };
            }
            // 010, 011, 016, 017, 018, 019로 시작하는지 확인
            const prefix = phone.substring(0, 3);
            const validPrefixes = ['010', '011', '016', '017', '018', '019'];
            if (!validPrefixes.includes(prefix)) {
                return { valid: false, message: "유효하지 않은 전화번호입니다." };
            }
            return { valid: true, message: "" };
        };

        const transactionLog = [];
        let currentUser = null;
        let currentDueInfo = null;

        // 변경 로그 불러오기
        const loadChangeLog = async () => {
            try {
                const logs = await getAllFromStore('changeLog');
                return logs || [];
            } catch (error) {
                console.error('Failed to load change log:', error);
                return [];
            }
        };

        // 변경 로그 저장
        const saveChangeLog = async (changeLog) => {
            try {
                // 최근 50개만 저장
                const limitedLog = changeLog.slice(-50);
                await saveAllToStore('changeLog', limitedLog);
            } catch (error) {
                console.error('Failed to save change log:', error);
            }
        };

        let changeLog = [];

        // 변경 로그 추가
        const addChangeLog = async (action, details) => {
            try {
                const logEntry = {
                    time: new Date().toISOString(),
                    action: action,
                    details: details
                };
                await addToStore('changeLog', logEntry);
                // 메모리 배열도 업데이트
                changeLog = await loadChangeLog();
                // 50개 제한 적용
                if (changeLog.length > 50) {
                    await saveChangeLog(changeLog);
                }
            } catch (error) {
                console.error('Failed to add change log:', error);
            }
        };

        // 로그인 기록 관리
        const loadLoginLog = async () => {
            try {
                const logs = await getAllFromStore('loginLog');
                return logs || [];
            } catch (error) {
                console.error('Failed to load login log:', error);
                return [];
            }
        };

        const saveLoginLog = async (log) => {
            try {
                // 최근 100개만 저장
                const limitedLog = log.slice(-100);
                await saveAllToStore('loginLog', limitedLog);
            } catch (error) {
                console.error('Failed to save login log:', error);
            }
        };

        let loginLog = [];

        const addLoginLog = async (user) => {
            try {
                const logEntry = {
                    time: new Date().toISOString(),
                    name: user.name,
                    studentId: user.studentId,
                    phone: user.phone
                };
                await addToStore('loginLog', logEntry);
                // 메모리 배열도 업데이트
                loginLog = await loadLoginLog();
                // 100개 제한 적용
                if (loginLog.length > 100) {
                    await saveLoginLog(loginLog);
                }
            } catch (error) {
                console.error('Failed to add login log:', error);
            }
        };

        // IndexedDB에서 데이터 불러오기
        const loadData = async () => {
            try {
                let savedItems = await getAllFromStore('items');
                let savedBorrowed = await getAllFromStore('borrowed');

                // 기본 물품 데이터
                const defaultItems = [
                    { name: "우산", type: "대여", stock: 7, notice: "비 오는 날 사용 후 충분히 말려서 반납", icon: "🌂" },
                    { name: "충전기", type: "대여", stock: 5, notice: "케이블 손상 시 즉시 관리자에게 보고", icon: "🔌" },
                    { name: "USB 허브", type: "대여", stock: 3, notice: "USB 포트 무리하게 꽂지 않기", icon: "🔗" },
                    { name: "USB 허브 C타입", type: "대여", stock: 3, notice: "USB 포트 무리하게 꽂지 않기", icon: "💻" },
                    { name: "농구공", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🏀" },
                    { name: "풋살볼", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "⚽" },
                    { name: "피구공", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🔴" },
                    { name: "공", type: "대여", stock: 4, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "⚽" },
                    { name: "담요", type: "대여", stock: 2, notice: "음식물·화장품 묻지 않게 주의", icon: "🛏️" },
                    { name: "핫팩", type: "소모품", stock: 20, notice: "개봉 후 재활용 불가, 즉시 폐기", icon: "🔥" },
                    { name: "마스크", type: "소모품", stock: 50, notice: "1인 1개 제한", icon: "😷" }
                ];

                // 테스트용 연체자 예시 데이터 생성 (3일 전 날짜로 설정)
                const now = new Date();
                const overdueDate = new Date(now);
                overdueDate.setDate(overdueDate.getDate() - 3);
                overdueDate.setHours(18, 0, 0, 0);

                const overdueExample = {
                    studentId: "2020123456",
                    name: "홍길동",
                    phone: "01012345678",
                    itemName: "우산",
                    dueLabel: `${overdueDate.getMonth() + 1}/${overdueDate.getDate()}(${["일", "월", "화", "수", "목", "금", "토"][overdueDate.getDay()]}) 18:00`,
                    dueDate: overdueDate.toISOString(),
                    borrowedAt: new Date(overdueDate.getTime() - 24 * 60 * 60 * 1000).toISOString() // 하루 전에 대여
                };

                if (savedItems && savedItems.length > 0) {
                    const items = savedItems;
                    let borrowedRecords = savedBorrowed || [];

                    // 새 물품 목록 (기존 데이터에 없으면 추가)
                    const newItems = [
                        { name: "USB 허브 C타입", type: "대여", stock: 3, notice: "USB 포트 무리하게 꽂지 않기", icon: "💻" },
                        { name: "농구공", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🏀" },
                        { name: "풋살볼", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "⚽" },
                        { name: "피구공", type: "대여", stock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🔴" },
                        { name: "마스크", type: "소모품", stock: 50, notice: "1인 1개 제한", icon: "😷" }
                    ];

                    let updated = false;
                    newItems.forEach(newItem => {
                        if (!items.some(item => item.name === newItem.name)) {
                            items.push(newItem);
                            updated = true;
                        }
                    });

                    // 물품 아이콘 추가 (기존 데이터 호환)
                    const iconMap = {
                        "우산": "🌂",
                        "충전기": "🔌",
                        "USB 허브": "🔗",
                        "USB 허브 C타입": "💻",
                        "농구공": "🏀",
                        "풋살볼": "⚽",
                        "피구공": "🔴",
                        "공": "⚽",
                        "담요": "🛏️",
                        "핫팩": "🔥",
                        "마스크": "😷"
                    };
                    items.forEach(item => {
                        if (iconMap[item.name] && item.icon !== iconMap[item.name]) {
                            item.icon = iconMap[item.name];
                            updated = true;
                        }
                    });
                    if (updated) {
                        await saveAllToStore('items', items);
                    }

                    // 연체자 예시가 없으면 추가
                    const hasOverdueExample = borrowedRecords.some(record =>
                        record.studentId === overdueExample.studentId && record.itemName === overdueExample.itemName
                    );

                    if (!hasOverdueExample) {
                        borrowedRecords.push(overdueExample);
                        await saveAllToStore('borrowed', borrowedRecords);
                    }

                    return {
                        items: items,
                        borrowedRecords: borrowedRecords
                    };
                }

                // 기본 데이터를 IndexedDB에 저장
                await saveAllToStore('items', defaultItems);
                await saveAllToStore('borrowed', [overdueExample]);

                return {
                    items: defaultItems,
                    borrowedRecords: [overdueExample]
                };
            } catch (error) {
                console.error('Failed to load data:', error);
                return { items: [], borrowedRecords: [] };
            }
        };

        let items = [];
        let borrowedRecords = [];

        // 데이터 저장 함수
        const saveData = async () => {
            try {
                await saveAllToStore('items', items);
                await saveAllToStore('borrowed', borrowedRecords);
            } catch (error) {
                console.error('Failed to save data:', error);
            }
        };

        const userInfoPopup = document.getElementById("userInfoPopup");
        const userInfoCard = document.getElementById("userInfoCard");
        const logBoard = document.getElementById("logBoard");
        const brandLogo = document.getElementById("brandLogo");

        const showStep = (step) => {
            // 모든 섹션을 숨김 처리
            stepUser.classList.add("hidden");
            stepItems.classList.add("hidden");
            stepAdmin.classList.add("hidden"); // 관리자 섹션 숨김 추가
            stepOverdue.classList.add("hidden"); // 연체자 섹션 숨김 추가
            stepChangelog.classList.add("hidden"); // 변경 로그 섹션 숨김 추가
            if (userInfoPopup) userInfoPopup.classList.add("hidden");
            if (logBoard) logBoard.classList.add("hidden");
            if (adminBorrowedPopup) adminBorrowedPopup.classList.add("hidden");
            if (brandLogo) brandLogo.classList.add("hidden");
            const loginLogPopup = document.getElementById("loginLogPopup");
            if (loginLogPopup) loginLogPopup.classList.add("hidden");

            if (step === "items") {
                stepItems.classList.remove("hidden");


                if (logBoard) logBoard.classList.add("hidden");
                if (brandLogo) brandLogo.classList.remove("hidden");
                if (userInfoPopup) {
                    userInfoPopup.classList.remove("hidden");
                    userInfoPopup.style.top = '20px';
                    userInfoPopup.style.left = '20px';
                }
                // 자동 로그아웃 타이머 시작
                if (typeof resetAutoLogout === 'function') {
                    resetAutoLogout();
                }
            } else if (step === "admin") { // 관리자 모드일 경우
                stepAdmin.classList.remove("hidden");
                if (adminBorrowedPopup) adminBorrowedPopup.classList.remove("hidden");


                // 관리자 모드일 때 현재 대여 기록 공간 확보
                const kiosk = document.querySelector('.kiosk');
                if (kiosk) {
                    kiosk.style.marginLeft = '740px';
                    kiosk.style.width = 'min(1200px, calc(100vw - 760px))';
                }
                renderAdminData(); // 관리자 모드 진입 시 데이터 렌더링
            } else if (step === "overdue") { // 연체자 화면일 경우
                stepOverdue.classList.remove("hidden");


                renderOverdueData(); // 연체자 화면 진입 시 데이터 렌더링
            } else if (step === "changelog") { // 변경 로그 화면일 경우
                stepChangelog.classList.remove("hidden");
                const loginLogPopup = document.getElementById("loginLogPopup");
                if (loginLogPopup) loginLogPopup.classList.remove("hidden");


                // 변경 로그 화면에서도 레이아웃 조정
                const kiosk = document.querySelector('.kiosk');
                if (kiosk) {
                    kiosk.style.marginLeft = '740px';
                    kiosk.style.width = 'min(1200px, calc(100vw - 760px))';
                }
                renderChangeLogView(); // 변경 로그 화면 진입 시 데이터 렌더링
                renderLoginLog(); // 로그인 기록 렌더링
            } else { // 기본값 (user)
                stepUser.classList.remove("hidden");
                // STEP 1에서는 제목과 부제목 숨김 (로고가 브랜드 역할)


                if (brandLogo) brandLogo.classList.remove("hidden");
                // 기본 모드일 때 레이아웃 원복
                const kiosk = document.querySelector('.kiosk');
                if (kiosk) {
                    kiosk.style.marginLeft = '';
                    kiosk.style.width = '';
                }
            }
        };

        const renderAdminData = () => {
            // 0. 통계 대시보드 업데이트
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            // 오늘 대여 건수 (borrowedAt이 오늘인 것)
            const todayBorrowCount = borrowedRecords.filter(record => {
                if (!record.borrowedAt) return false;
                const borrowedDate = new Date(record.borrowedAt);
                return borrowedDate >= todayStart;
            }).length;
            
            // 현재 총 대여 중
            const totalBorrowed = borrowedRecords.length;
            
            // 연체 중인 인원 (중복 제거)
            const overdueStudents = new Set();
            borrowedRecords.forEach(record => {
                const dueDate = new Date(record.dueDate);
                if (dueDate < now) {
                    overdueStudents.add(record.studentId);
                }
            });
            const overdueCount = overdueStudents.size;
            
            // 통계 표시
            const statTodayBorrow = document.getElementById('statTodayBorrow');
            const statTotalBorrowed = document.getElementById('statTotalBorrowed');
            const statOverdue = document.getElementById('statOverdue');
            
            if (statTodayBorrow) statTodayBorrow.textContent = todayBorrowCount;
            if (statTotalBorrowed) statTotalBorrowed.textContent = totalBorrowed;
            if (statOverdue) statOverdue.textContent = overdueCount;
            
            // 1. 재고 현황 테이블 렌더링
            const stockHtml = `
                <table id="stockTable" style="table-layout: fixed;">
                    <colgroup>
                        <col style="width: 8%;">
                        <col style="width: 20%;">
                        <col style="width: 12%;">
                        <col style="width: 25%;">
                        <col style="width: 20%;">
                        <col style="width: 15%;">
                    </colgroup>
                    <tr><th>순서</th><th>물품명</th><th>구분</th><th>재고</th><th>주의사항</th><th>관리</th></tr>
                    ${items.map((item, index) => `
                        <tr draggable="true" data-index="${index}" style="cursor: move;">
                            <td style="text-align: center; color: #9ba3bf; font-size: 0.9rem;">⋮⋮</td>
                            <td>${item.name}</td>
                            <td>${item.type}</td>
                            <td style="padding: 14px 20px;">
                                <div style="display: flex; align-items: center; gap: 12px; justify-content: center;">
                                    <button onclick="updateStock(${index}, -1)" style="padding: 8px 12px; border-radius: 8px; border: 1px solid #2c3242; background: #252836; color: #fff; cursor: pointer; font-size: 1.1rem; font-weight: 600;">-</button>
                                    <span style="font-size: 1.05rem;">${item.stock}개</span>
                                    <button onclick="updateStock(${index}, 1)" style="padding: 8px 12px; border-radius: 8px; border: 1px solid #2c3242; background: #252836; color: #fff; cursor: pointer; font-size: 1.1rem; font-weight: 600;">+</button>
                                </div>
                            </td>
                            <td style="font-size: 0.8rem; color: #9ba3bf;">${item.notice || '-'}</td>
                            <td>
                                <button onclick="deleteItem(${index})" style="padding: 10px 16px; border-radius: 10px; border: none; background: #ff5c5c; color: #fff; cursor: pointer; font-size: 0.95rem; font-weight: 600;">삭제</button>
                            </td>
                        </tr>
                    `).join('')}
                </table>
            `;
            adminStockTable.innerHTML = stockHtml;

            // 드래그 앤 드롭 이벤트 설정
            const stockTable = document.getElementById('stockTable');
            if (stockTable) {
                let draggedRow = null;
                let draggedIndex = null;

                stockTable.addEventListener('dragstart', (e) => {
                    // 버튼이나 입력 필드에서는 드래그 비활성화
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
                        e.preventDefault();
                        return;
                    }
                    
                    const row = e.target.closest('tr[data-index]');
                    if (row) {
                        draggedRow = row;
                        draggedIndex = parseInt(row.dataset.index);
                        row.style.opacity = '0.5';
                    } else {
                        e.preventDefault();
                    }
                });

                stockTable.addEventListener('dragend', (e) => {
                    if (draggedRow) {
                        draggedRow.style.opacity = '1';
                    }
                    draggedRow = null;
                    draggedIndex = null;
                });

                stockTable.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const targetRow = e.target.closest('tr');
                    if (targetRow && targetRow.dataset.index !== undefined && targetRow !== draggedRow) {
                        const allRows = Array.from(stockTable.querySelectorAll('tr[data-index]'));
                        allRows.forEach(row => row.style.backgroundColor = '');
                        targetRow.style.backgroundColor = 'rgba(97, 125, 255, 0.2)';
                    }
                });

                stockTable.addEventListener('dragleave', (e) => {
                    const targetRow = e.target.closest('tr');
                    if (targetRow) {
                        targetRow.style.backgroundColor = '';
                    }
                });

                stockTable.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const targetRow = e.target.closest('tr');
                    if (targetRow && targetRow.dataset.index !== undefined && draggedIndex !== null) {
                        const targetIndex = parseInt(targetRow.dataset.index);
                        if (draggedIndex !== targetIndex) {
                            window.moveItemTo(draggedIndex, targetIndex);
                        }
                    }
                    // 모든 행의 배경색 초기화
                    const allRows = Array.from(stockTable.querySelectorAll('tr[data-index]'));
                    allRows.forEach(row => row.style.backgroundColor = '');
                });
            }

            // 2. 현재 대여 기록 테이블 렌더링
            if (borrowedRecords.length === 0) {
                adminBorrowedTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>현재 대여된 물품이 없습니다.</p>";
                return;
            }

            const borrowedHtml = `
                <table style="table-layout: auto;">
                    <tr><th>물품</th><th>학번</th><th>이름</th><th>연락처</th><th>반납 기한</th></tr>
                    ${borrowedRecords.map(record => {
                        // 18:00 제거
                        const dueLabelWithoutTime = record.dueLabel.replace(' 18:00', '');
                        return `
                        <tr>
                            <td style="white-space: nowrap;">${record.itemName}</td>
                            <td style="white-space: nowrap;">${record.studentId}</td>
                            <td style="white-space: nowrap;">${record.name}</td>
                            <td style="white-space: nowrap;">${record.phone}</td>
                            <td style="color: #ff8f8f; white-space: nowrap; font-size: 0.9rem;">${dueLabelWithoutTime}</td>
                        </tr>
                    `;
                    }).join('')}
                </table>
            `;
            adminBorrowedTable.innerHTML = borrowedHtml;
        };

        // 변경 로그 렌더링 함수 (관리자 모드용)
        const renderChangeLog = () => {
            if (changeLog.length === 0) {
                adminChangeLog.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>변경 기록이 없습니다.</p>";
                return;
            }

            // 최근 10개만 표시 (최신 순)
            const recentLogs = changeLog.slice(-10).reverse();
            const formatTime = (dateString) => {
                const date = new Date(dateString);
                return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
            };

            const logHtml = `
                <table>
                    <tr><th>시간</th><th>작업</th><th>상세 내역</th></tr>
                    ${recentLogs.map(log => `
                        <tr>
                            <td style="font-size: 0.8rem;">${formatTime(log.time)}</td>
                            <td style="color: #9aa9ff; font-weight: 600;">${log.action}</td>
                            <td style="font-size: 0.85rem;">${log.details}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            adminChangeLog.innerHTML = logHtml;
        };

        // 변경 로그 화면 렌더링 함수
        const renderChangeLogView = () => {
            if (changeLog.length === 0) {
                changeLogView.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>변경 기록이 없습니다.</p>";
                return;
            }

            // 최근 50개 표시 (최신 순)
            const recentLogs = changeLog.slice(-50).reverse();
            const formatTime = (dateString) => {
                const date = new Date(dateString);
                return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
            };

            const logHtml = `
                <table>
                    <tr><th>시간</th><th>작업</th><th>상세 내역</th></tr>
                    ${recentLogs.map(log => `
                        <tr>
                            <td style="font-size: 0.85rem;">${formatTime(log.time)}</td>
                            <td style="color: #9aa9ff; font-weight: 600;">${log.action}</td>
                            <td style="font-size: 0.9rem;">${log.details}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            changeLogView.innerHTML = logHtml;
        };

        // 로그인 기록 렌더링 함수
        const renderLoginLog = () => {
            const loginLogTable = document.getElementById("loginLogTable");
            if (!loginLogTable) return;
            
            if (loginLog.length === 0) {
                loginLogTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>로그인 기록이 없습니다.</p>";
                return;
            }

            // 최근 50개 표시 (최신 순)
            const recentLogs = loginLog.slice(-50).reverse();
            const formatTime = (dateString) => {
                const date = new Date(dateString);
                return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
            };

            const logHtml = `
                <table style="table-layout: auto;">
                    <tr><th>시간</th><th>이름</th><th>학번</th><th>연락처</th></tr>
                    ${recentLogs.map(log => `
                        <tr>
                            <td style="font-size: 0.85rem; white-space: nowrap;">${formatTime(log.time)}</td>
                            <td style="white-space: nowrap;">${log.name}</td>
                            <td style="white-space: nowrap;">${log.studentId}</td>
                            <td style="white-space: nowrap;">${log.phone}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            loginLogTable.innerHTML = logHtml;
        };

        // 연체자 데이터 렌더링 함수
        const renderOverdueData = () => {
            const now = new Date();
            const overdueRecords = borrowedRecords.filter(record => {
                const dueDate = new Date(record.dueDate);
                return dueDate < now;
            });

            if (overdueRecords.length === 0) {
                overdueTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>연체된 대여 기록이 없습니다.</p>";
                return;
            }

            // 연체 일수 계산
            const calculateOverdueDays = (dueDate) => {
                const due = new Date(dueDate);
                const diffTime = now - due;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
            };

            // 연체 벌금 계산 (1일당 2000원)
            const calculateFine = (dueDate) => {
                const days = calculateOverdueDays(dueDate);
                return days * 2000;
            };

            const overdueHtml = `
                <table style="table-layout: auto; min-width: 100%;">
                    <colgroup>
                        <col style="width: 8%;">
                        <col style="width: 10%;">
                        <col style="width: 8%;">
                        <col style="width: 10%;">
                        <col style="width: 15%;">
                        <col style="width: 8%;">
                        <col style="width: 15%;">
                        <col style="width: 16%;">
                    </colgroup>
                    <tr><th>물품</th><th>학번</th><th>이름</th><th>연락처</th><th>반납 기한</th><th>연체 일수</th><th>연체 벌금</th><th>관리</th></tr>
                    ${overdueRecords.map((record) => {
                        const overdueDays = calculateOverdueDays(record.dueDate);
                        const fine = calculateFine(record.dueDate);
                        // borrowedRecords에서 해당 기록의 인덱스 찾기
                        const recordIndex = borrowedRecords.findIndex(r => 
                            r.studentId === record.studentId && 
                            r.itemName === record.itemName && 
                            r.dueDate === record.dueDate
                        );
                        return `
                        <tr>
                            <td style="white-space: nowrap;">${record.itemName}</td>
                            <td style="white-space: nowrap;">${record.studentId}</td>
                            <td style="white-space: nowrap;">${record.name}</td>
                            <td style="white-space: nowrap;">${record.phone}</td>
                            <td style="color: #ff8f8f; white-space: nowrap; min-width: 120px;">${record.dueLabel}</td>
                            <td style="color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 80px;">${overdueDays}일</td>
                            <td style="color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 100px;">${fine.toLocaleString()}원</td>
                            <td style="white-space: nowrap;">
                                <button onclick="forceReturn('${record.studentId}', '${record.itemName}', '${record.dueDate}')" style="padding: 8px 16px; border-radius: 10px; border: none; background: #4e5fe5; color: #fff; cursor: pointer; font-size: 0.9rem; font-weight: 600;">강제 반납</button>
                            </td>
                        </tr>
                    `;
                    }).join('')}
                </table>
            `;
            overdueTable.innerHTML = overdueHtml;
        };

        const showSelectionResult = (message, isSuccess = true) => {
            selectionResult.textContent = message;
            selectionResult.classList.remove("hidden");
            selectionResult.style.background = isSuccess ? "#1a2e1a" : "#2e1a1a";
            selectionResult.style.borderColor = isSuccess ? "#a0f0a0" : "#ff8f8f";
            selectionResult.style.color = isSuccess ? "#a0f0a0" : "#ff8f8f";
            
            // 성공 메시지는 자동으로 숨기지 않음
            // 오류 메시지만 3초 후 자동 숨김
            if (!isSuccess) {
                setTimeout(() => {
                    selectionResult.classList.add("hidden");
                }, 3000);
            }
        };

        const setError = (element, message) => {
            element.textContent = message;
        };

        // 물품 검색 및 필터 기능
        let searchQuery = '';
        let currentFilter = 'all'; // 'all', 'borrow', 'consume'
        const itemSearch = document.getElementById('itemSearch');
        const clearSearchBtn = document.getElementById('clearSearch');
        const filterAllBtn = document.getElementById('filterAll');
        const filterBorrowBtn = document.getElementById('filterBorrow');
        const filterConsumeBtn = document.getElementById('filterConsume');
        
        if (itemSearch) {
            itemSearch.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                if (searchQuery) {
                    clearSearchBtn.style.display = 'block';
                } else {
                    clearSearchBtn.style.display = 'none';
                }
                renderItems();
            });
        }
        
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                itemSearch.value = '';
                searchQuery = '';
                clearSearchBtn.style.display = 'none';
                renderItems();
            });
        }

        // 필터 버튼 이벤트
        const setFilter = (filter) => {
            currentFilter = filter;
            
            // 모든 필터 버튼 비활성화 스타일
            [filterAllBtn, filterBorrowBtn, filterConsumeBtn].forEach(btn => {
                if (btn) {
                    btn.style.background = '#252836';
                    btn.style.borderColor = '#2c3242';
                    btn.style.color = '#f6f7fb';
                    btn.classList.remove('active');
                }
            });
            
            // 선택된 필터 버튼 활성화 스타일
            const activeBtn = filter === 'all' ? filterAllBtn : 
                             filter === 'borrow' ? filterBorrowBtn : filterConsumeBtn;
            if (activeBtn) {
                activeBtn.style.background = '#617dff';
                activeBtn.style.borderColor = '#617dff';
                activeBtn.style.color = '#fff';
                activeBtn.classList.add('active');
            }
            
            renderItems();
        };

        if (filterAllBtn) {
            filterAllBtn.addEventListener('click', () => setFilter('all'));
        }
        if (filterBorrowBtn) {
            filterBorrowBtn.addEventListener('click', () => setFilter('borrow'));
        }
        if (filterConsumeBtn) {
            filterConsumeBtn.addEventListener('click', () => setFilter('consume'));
        }

        const renderItems = () => {
            // 필터링
            let filteredItems = items;
            
            // 타입 필터링
            if (currentFilter === 'borrow') {
                filteredItems = filteredItems.filter(item => item.type === '대여');
            } else if (currentFilter === 'consume') {
                filteredItems = filteredItems.filter(item => item.type === '소모품');
            }
            
            // 검색 필터링
            if (searchQuery) {
                filteredItems = filteredItems.filter(item => 
                    item.name.toLowerCase().includes(searchQuery) ||
                    item.type.toLowerCase().includes(searchQuery) ||
                    (item.notice && item.notice.toLowerCase().includes(searchQuery))
                );
            }
            
            if (filteredItems.length === 0) {
                const message = searchQuery 
                    ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                    : currentFilter === 'borrow' 
                        ? '대여 가능한 물품이 없습니다.'
                        : currentFilter === 'consume'
                            ? '소모품이 없습니다.'
                            : '물품이 없습니다.';
                itemGrid.innerHTML = `<div style="text-align: center; padding: 40px; color: #9ba3bf; font-size: 1.1rem;">${message}</div>`;
                return;
            }
            
            itemGrid.innerHTML = filteredItems
                .map((item, index) => {
                    // 원본 배열에서의 인덱스 찾기
                    const originalIndex = items.indexOf(item);
                    return `
                    <div class="item-card">
                        ${item.icon ? `<span style="font-size: 2.5rem; flex-shrink: 0;">${item.icon}</span>` : (item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; flex-shrink: 0;">` : '')}
                        <div class="item-card-info">
                            <strong>${item.name}</strong>
                            <small>${item.type} · 재고 ${item.stock}개</small>
                        </div>
                        <div class="item-card-actions">
                            ${
                                item.type === "대여"
                                    ? `
                                <button class="borrow ${item.stock <= 0 ? 'disabled' : ''}" data-action="borrow" data-index="${originalIndex}" ${item.stock <= 0 ? 'disabled title="재고가 없습니다"' : ''}>
                                    ${item.stock <= 0 ? '재고 없음' : '대여하기'}
                                </button>
                                <button class="secondary" data-action="return" data-index="${originalIndex}">
                                    반납하기
                                </button>
                            `
                                    : `
                                <button class="consume ${item.stock <= 0 ? 'disabled' : ''}" data-action="consume" data-index="${originalIndex}" ${item.stock <= 0 ? 'disabled title="재고가 없습니다"' : ''}>
                                    ${item.stock <= 0 ? '재고 없음' : '수령하기'}
                                </button>
                            `
                            }
                        </div>
                    </div>
                `;
                })
                .join("");
        };

        renderItems();

        // 물품 목록 드래그 스크롤 기능
        let isDragging = false;
        let startY = 0;
        let scrollTop = 0;

        itemGrid.addEventListener('mousedown', (e) => {
            // 버튼 클릭이 아닌 경우에만 드래그 시작
            if (e.target.tagName !== 'BUTTON') {
                isDragging = true;
                startY = e.pageY - itemGrid.offsetTop;
                scrollTop = itemGrid.scrollTop;
                itemGrid.style.cursor = 'grabbing';
            }
        });

        itemGrid.addEventListener('mouseleave', () => {
            isDragging = false;
            itemGrid.style.cursor = 'grab';
        });

        itemGrid.addEventListener('mouseup', () => {
            isDragging = false;
            itemGrid.style.cursor = 'grab';
        });

        itemGrid.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const y = e.pageY - itemGrid.offsetTop;
            const walk = (y - startY) * 2; // 스크롤 속도 조절
            itemGrid.scrollTop = scrollTop - walk;
        });

        // 터치 이벤트 지원
        let touchStartY = 0;
        let touchScrollTop = 0;

        itemGrid.addEventListener('touchstart', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                touchStartY = e.touches[0].pageY;
                touchScrollTop = itemGrid.scrollTop;
            }
        }, { passive: true });

        itemGrid.addEventListener('touchmove', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const touchY = e.touches[0].pageY;
                const walk = (touchY - touchStartY) * 2;
                itemGrid.scrollTop = touchScrollTop - walk;
            }
        }, { passive: true });

        // STEP3 관리자 모드 물품 재고 현황 드래그 스크롤 기능
        let adminIsDragging = false;
        let adminStartY = 0;
        let adminScrollTop = 0;

        adminStockTable.addEventListener('mousedown', (e) => {
            // 버튼 클릭이 아닌 경우에만 드래그 시작
            if (e.target.tagName !== 'BUTTON') {
                adminIsDragging = true;
                adminStartY = e.pageY - adminStockTable.offsetTop;
                adminScrollTop = adminStockTable.scrollTop;
                adminStockTable.style.cursor = 'grabbing';
            }
        });

        adminStockTable.addEventListener('mouseleave', () => {
            adminIsDragging = false;
            adminStockTable.style.cursor = 'grab';
        });

        adminStockTable.addEventListener('mouseup', () => {
            adminIsDragging = false;
            adminStockTable.style.cursor = 'grab';
        });

        adminStockTable.addEventListener('mousemove', (e) => {
            if (!adminIsDragging) return;
            e.preventDefault();
            const y = e.pageY - adminStockTable.offsetTop;
            const walk = (y - adminStartY) * 2; // 스크롤 속도 조절
            adminStockTable.scrollTop = adminScrollTop - walk;
        });

        // 터치 이벤트 지원
        let adminTouchStartY = 0;
        let adminTouchScrollTop = 0;

        adminStockTable.addEventListener('touchstart', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                adminTouchStartY = e.touches[0].pageY;
                adminTouchScrollTop = adminStockTable.scrollTop;
            }
        }, { passive: true });

        adminStockTable.addEventListener('touchmove', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const touchY = e.touches[0].pageY;
                const walk = (touchY - adminTouchStartY) * 2;
                adminStockTable.scrollTop = adminTouchScrollTop - walk;
            }
        }, { passive: true });

        // 초기 로드 시 STEP1로 설정하며 CCTV 모달 표시
        const initApp = async () => {
            try {
                // IndexedDB 초기화
                await initDB();
                console.log('IndexedDB initialized');

                // localStorage에서 마이그레이션 (처음 한 번만)
                const migrated = localStorage.getItem('migrated_to_indexeddb');
                if (!migrated) {
                    await migrateFromLocalStorage();
                }

                // 데이터 로드
                const data = await loadData();
                items = data.items;
                borrowedRecords = data.borrowedRecords;

                // 로그 데이터 로드
                changeLog = await loadChangeLog();
                loginLog = await loadLoginLog();

                console.log('Data loaded from IndexedDB');

                // 데이터 로드 후 물품 목록 렌더링
                renderItems();
            } catch (error) {
                console.error('Initialization error:', error);
            }

            showStep("user");
        };
        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", initApp);
        } else {
            initApp();
        }

        const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];

        const getDueInfo = () => {
            const now = new Date();
            const day = now.getDay();
            const due = new Date(now);

            if (day === 5) {
                // Friday → next Monday
                due.setDate(due.getDate() + 3);
            } else if (day === 6) {
                // Saturday → next Monday
                due.setDate(due.getDate() + 2);
            } else {
                due.setDate(due.getDate() + 1);
            }

            due.setHours(18, 0, 0, 0);
            return {
                date: due,
                label: `${due.getMonth() + 1}/${due.getDate()}(${weekdayNames[due.getDay()]}) 18:00`,
                isWeekendPenalty: day <= 4 // Monday~Thursday
            };
        };

        const formatTime = (date) =>
            `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
                date.getMinutes()
            ).padStart(2, "0")}`;

        const addLog = (entry) => {
            transactionLog.unshift(entry);
            if (transactionLog.length > 6) {
                transactionLog.pop();
            }
            renderLogs();
        };

        const renderLogs = () => {
            if (transactionLog.length === 0) {
                logList.innerHTML = "<li>아직 기록이 없습니다.</li>";
                return;
            }

            logList.innerHTML = transactionLog
                .map(
                    (log) => `
                <li>
                    <strong>${log.user.name}</strong> · ${log.item} (${log.action})<br>
                    ${log.message}<br>
                    ${log.time}
                </li>
            `
                )
                .join("");
        };

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            selectionResult.classList.add("hidden");
            selectionResult.textContent = "";

            // 입력값 가져오기 및 XSS 방지
            const rawName = form.name.value.trim();
            const rawStudentId = form.studentId.value.trim();
            const rawPhone = form.phone.value.trim();

            // HTML 이스케이프 처리
            const name = escapeHtml(rawName);
            const studentId = escapeHtml(rawStudentId);
            const phone = escapeHtml(rawPhone);

            let isValid = true;

            // 이름 검증
            const nameValidation = validateName(name);
            if (!nameValidation.valid) {
                setError(nameError, nameValidation.message);
                isValid = false;
            } else {
                setError(nameError, "");
            }

            // 학번 검증
            const studentIdValidation = validateStudentId(studentId);
            if (!studentIdValidation.valid) {
                setError(studentIdError, studentIdValidation.message);
                isValid = false;
            } else {
                setError(studentIdError, "");
            }

            // 전화번호 검증
            const phoneValidation = validatePhone(phone);
            if (!phoneValidation.valid) {
                setError(phoneError, phoneValidation.message);
                isValid = false;
            } else {
                setError(phoneError, "");
            }

            if (!isValid) {
                return;
            }

            currentUser = { name, studentId, phone };
            currentDueInfo = getDueInfo();
            
            // 로그인 기록 저장
            addLoginLog(currentUser);

            const userInfoHtml = `
                <strong>${name} (${studentId})</strong><br>
                연락처: ${phone}<br>
                반납 기한: <span style="color: #ff8f8f; font-weight: 600;">${currentDueInfo.label}</span><br>
                <ul>
                    <li>기한 초과 시 1일당 2,000원 벌금 (주말 포함)</li>
                    <li>${currentDueInfo.isWeekendPenalty ? "같은 주 내 미반납 시 주말에도 벌금이 부과됩니다." : "금요일 대여는 다음 주 월요일 18:00까지 반납"}</li>
                    <li>물품 분실·파손 시 동일 제품으로 변상</li>
                </ul>
            `;
            
            if (userInfoCard) {
                userInfoCard.innerHTML = userInfoHtml;
            }
            if (summaryBox) {
                summaryBox.innerHTML = userInfoHtml;
            }

            showStep("items");
        });

        // Debounce 기능
        let isProcessing = false;
        const debounceTime = 400; // 400ms
        
        itemGrid.addEventListener("click", async (event) => {
            if (event.target.tagName !== "BUTTON") return;
            
            // Debounce 체크
            if (isProcessing) return;
            isProcessing = true;
            setTimeout(() => { isProcessing = false; }, debounceTime);

            const { action, index } = event.target.dataset;
            const item = items[Number(index)];

            if (!currentUser) {
                alert("먼저 학생 정보를 입력해주세요.");
                return;
            }
            
            // 재고 없으면 무시
            if ((action === "borrow" || action === "consume") && item.stock <= 0) {
                return;
            }

            if (action === "borrow") {
                if (item.stock <= 0) {
                    showSelectionResult(`⚠️ ${item.name} 재고가 부족합니다. 다른 물품을 선택해주세요.`, false);
                    return;
                }

                // 중복 대여 방지: 이미 빌린 물품인지 확인
                const alreadyBorrowed = borrowedRecords.some(
                    (record) => record.studentId === currentUser.studentId && record.itemName === item.name
                );
                if (alreadyBorrowed) {
                    showSelectionResult(`⚠️ 이미 ${item.name}을(를) 대여 중입니다.\n먼저 반납 후 다시 대여해주세요.`, false);
                    return;
                }

                // 주의사항 메시지 구성
                let noticeMsg = '';
                if (item.notice && item.notice.trim()) {
                    noticeMsg = `⚠️ 주의사항: ${item.notice}`;
                }

                await showConfirm({
                    icon: item.icon || '📦',
                    title: `${item.name} 대여`,
                    stock: item.stock,
                    message: noticeMsg || '대여 후 기한 내 반납해주세요.',
                    autoClose: 3000
                });
                
                const dueInfo = currentDueInfo || getDueInfo();
                borrowedRecords.push({
                    studentId: currentUser.studentId,
                    name: currentUser.name,
                    phone: currentUser.phone,
                    itemName: item.name,
                    dueLabel: dueInfo.label,
                    dueDate: dueInfo.date.toISOString(),
                    borrowedAt: new Date().toISOString()
                });
                item.stock -= 1;
                const dueLabel = (currentDueInfo || getDueInfo()).label;
                saveData(); // 데이터 저장
                renderItems();
                showSelectionResult(
                    `✅ ${item.name} 대여 완료!\n반납 예정일은 ${dueLabel}입니다.\n\n기한 초과 시 1일당 2,000원 벌금(주말 포함)이 부과됩니다.`,
                    true
                );
                addLog({
                    user: currentUser,
                    item: item.name,
                    action: "대여",
                    message: `반납 예정일 ${dueLabel}`,
                    time: formatTime(new Date())
                });

                return;
            }

            if (action === "return") {
                const borrowedIndex = borrowedRecords.findIndex(
                    (record) =>
                        record.studentId === currentUser.studentId && record.itemName === item.name
                );

                if (borrowedIndex === -1) {
                    showSelectionResult(`⚠️ ${item.name} 대여 이력이 확인되지 않습니다. 관리자에게 문의해주세요.`, false);
                    return;
                }

                borrowedRecords.splice(borrowedIndex, 1);
                item.stock += 1;
                saveData(); // 데이터 저장
                renderItems();
                showSelectionResult(`✅ ${item.name} 반납 처리되었습니다. 상태 이상 시 관리자에게 보고해주세요.`, true);
                addLog({
                    user: currentUser,
                    item: item.name,
                    action: "반납",
                    message: "정상 반납",
                    time: formatTime(new Date())
                });

                return;
            }

            if (action === "consume") {
                if (item.stock <= 0) {
                    showSelectionResult(`⚠️ ${item.name} 재고가 모두 소진되었습니다.`, false);
                    return;
                }
                item.stock -= 1;
                saveData(); // 데이터 저장
                renderItems();
                showSelectionResult(`✅ ${item.name} 수령 완료! 소모품은 반납하지 않아도 됩니다.`, true);
                addLog({
                    user: currentUser,
                    item: item.name,
                    action: "소모품 수령",
                    message: "소모품은 반납 불필요",
                    time: formatTime(new Date())
                });

            }
        });

        editInfoBtn.addEventListener("click", async () => {
            // 현재 사용자의 대여 기록 확인
            const userBorrowed = borrowedRecords.filter(r => r.studentId === (currentUser && currentUser.studentId));

            if (userBorrowed.length > 0) {
                // 대여 기록이 있으면 경고
                let warningMsg = `⚠️ 대여 중인 물품이 있습니다!\n\n`;
                userBorrowed.forEach(record => {
                    warningMsg += `• ${record.itemName} (반납: ${record.dueLabel.replace(' 18:00', '')})\n`;
                });
                warningMsg += `\n대여 기록은 유지됩니다.\n첫 화면으로 돌아가시겠습니까?`;
                
                const confirmed = await showConfirm({
                    icon: '⚠️',
                    title: '대여 중인 물품 있음',
                    message: warningMsg
                });
                
                if (!confirmed) return;
            }
            
            form.reset();
            studentIdError.textContent = "";
            phoneError.textContent = "";
            currentUser = null;
            currentDueInfo = null;
            showStep("user");
        });

        finishBtn.addEventListener("click", async () => {
            // 현재 사용자의 대여 기록 확인
            const userBorrowed = borrowedRecords.filter(r => r.studentId === (currentUser && currentUser.studentId));

            // 요약 확인 메시지 생성
            let summaryMsg = '';
            if (userBorrowed.length > 0) {
                summaryMsg = `📋 대여 내역 확인\n\n`;
                summaryMsg += `👤 ${currentUser.name} (${currentUser.studentId})\n\n`;
                summaryMsg += `📦 대여 중인 물품:\n`;
                userBorrowed.forEach(record => {
                    summaryMsg += `• ${record.itemName} (반납: ${record.dueLabel.replace(' 18:00', '')})\n`;
                });
                summaryMsg += `\n기한 내 반납 부탁드립니다!`;
            } else {
                summaryMsg = `👤 ${(currentUser && currentUser.name) || '사용자'}님\n\n대여하신 물품이 없습니다.\n\n첫 화면으로 돌아가시겠습니까?`;
            }
            
            const confirmed = await showConfirm({
                icon: '✅',
                title: '완료 확인',
                message: summaryMsg
            });
            
            if (!confirmed) return;
            
            form.reset();
            studentIdError.textContent = "";
            phoneError.textContent = "";
            selectionResult.classList.add("hidden");
            selectionResult.textContent = "";
            currentUser = null;
            currentDueInfo = null;
            showStep("user");
        });

        // 자동 로그아웃 기능 (60초 동안 활동 없으면 첫 화면으로)
        let autoLogoutTimer = null;
        const AUTO_LOGOUT_TIME = 60000; // 60초
        
        const resetAutoLogout = () => {
            if (autoLogoutTimer) {
                clearTimeout(autoLogoutTimer);
            }
            // 물품 선택 화면(items)에서만 자동 로그아웃 작동
            if (currentUser && !stepItems.classList.contains('hidden')) {
                autoLogoutTimer = setTimeout(() => {
                    form.reset();
                    studentIdError.textContent = "";
                    phoneError.textContent = "";
                    selectionResult.classList.add("hidden");
                    selectionResult.textContent = "";
                    currentUser = null;
                    currentDueInfo = null;
                    showStep("user");
                }, AUTO_LOGOUT_TIME);
            }
        };
        
        // 사용자 활동 감지
        ['click', 'touchstart', 'mousemove', 'keydown'].forEach(event => {
            document.addEventListener(event, resetAutoLogout, { passive: true });
        });

        // 로고 더블클릭으로 관리자 모드 진입
        if (brandLogo) {
            brandLogo.addEventListener("dblclick", async () => {
                const password = prompt("관리자 비밀번호를 입력하세요:");
                if (password === null) return; // 취소 시

                const isValid = await verifyAdminPassword(password);
                if (isValid) {
                    showStep("admin");
                } else {
                    alert("비밀번호가 틀렸습니다.");
                }
            });
        }

        // 변경 로그 화면에서 돌아가기 버튼
        backFromChangelogBtn.addEventListener("click", () => {
            showStep("admin");
        });

        // 관리자 모드 제목 더블클릭 시 변경 로그 화면으로 이동
        const adminTitle = document.getElementById("adminTitle");
        adminTitle.addEventListener("dblclick", async () => {
            const password = prompt("관리자 비밀번호를 입력하세요:");
            if (password === null) return; // 취소 시

            const isValid = await verifyAdminPassword(password);
            if (isValid) {
                showStep("changelog");
            } else {
                alert("비밀번호가 틀렸습니다.");
            }
        });

        // 2. 관리자 모드에서 로그아웃 버튼 이벤트 리스너 추가
        logoutAdminBtn.addEventListener("click", () => {
            showStep("user");
        });

        // 연체자 화면으로 이동
        viewOverdueBtn.addEventListener("click", () => {
            showStep("overdue");
        });

        // 관리자 모드로 돌아가기
        backToAdminBtn.addEventListener("click", () => {
            showStep("admin");
        });

        // 물품 추가 기능
        const addItemBtn = document.getElementById("addItemBtn");
        const newItemName = document.getElementById("newItemName");
        const newItemType = document.getElementById("newItemType");
        const newItemStock = document.getElementById("newItemStock");
        const newItemNotice = document.getElementById("newItemNotice");
        const exportBackupBtn = document.getElementById("exportBackupBtn");
        const importBackupBtn = document.getElementById("importBackupBtn");

        // 백업 내보내기 버튼
        if (exportBackupBtn) {
            exportBackupBtn.addEventListener("click", async () => {
                const password = prompt("⚠️ 백업을 내보내려면 관리자 비밀번호를 입력하세요:");
                if (password === null) return;

                const isValid = await verifyAdminPassword(password);
                if (!isValid) {
                    alert("비밀번호가 틀렸습니다.");
                    return;
                }

                await exportBackup();
            });
        }

        // 백업 불러오기 버튼
        if (importBackupBtn) {
            importBackupBtn.addEventListener("click", async () => {
                const password = prompt("⚠️ 백업을 불러오면 현재 데이터가 덮어씌워집니다.\n관리자 비밀번호를 입력하세요:");
                if (password === null) return;

                const isValid = await verifyAdminPassword(password);
                if (!isValid) {
                    alert("비밀번호가 틀렸습니다.");
                    return;
                }

                if (!confirm("⚠️ 정말 백업 파일에서 데이터를 복원하시겠습니까?\n현재 데이터가 모두 덮어씌워집니다.")) {
                    return;
                }

                const result = await selectAndImportBackup();
                alert(result.message);

                if (result.success) {
                    // UI 업데이트
                    renderAdminData();
                    renderItems();
                }
            });
        }

        addItemBtn.addEventListener("click", () => {
            const name = newItemName.value.trim();
            const type = newItemType.value;
            const stock = parseInt(newItemStock.value) || 0;
            const notice = newItemNotice.value.trim();

            if (!name) {
                alert("물품명을 입력해주세요.");
                return;
            }

            if (items.some(item => item.name === name)) {
                alert("이미 존재하는 물품명입니다.");
                return;
            }

            items.push({
                name: name,
                type: type,
                stock: stock,
                notice: notice || ""
            });

            saveData(); // 데이터 저장
            addChangeLog("물품 추가", `${name} (${type}, 재고: ${stock}개) 추가됨`);

            // 입력 필드 초기화
            newItemName.value = "";
            newItemStock.value = "";
            newItemNotice.value = "";

            // 관리자 화면과 사용자 화면 모두 업데이트
            renderAdminData();
            renderItems();

            alert(`${name} 물품이 추가되었습니다.`);
        });

        // 재고 수정 함수 (전역 함수로 만들기 위해 window 객체에 할당)
        window.updateStock = (index, change) => {
            if (index < 0 || index >= items.length) return;
            const item = items[index];
            const oldStock = item.stock;
            items[index].stock = Math.max(0, items[index].stock + change);
            const newStock = items[index].stock;
            saveData(); // 데이터 저장
            addChangeLog("재고 변경", `${item.name}: ${oldStock}개 → ${newStock}개 ${change > 0 ? "(+1)" : "(-1)"}`);
            renderAdminData();
            renderItems();
        };

        // 강제 반납 함수 (전역 함수로 만들기 위해 window 객체에 할당)
        window.forceReturn = async (studentId, itemName, dueDate) => {
            // borrowedRecords에서 해당 기록 찾기
            const recordIndex = borrowedRecords.findIndex(r =>
                r.studentId === studentId &&
                r.itemName === itemName &&
                r.dueDate === dueDate
            );

            if (recordIndex === -1) {
                alert("대여 기록을 찾을 수 없습니다.");
                return;
            }

            const record = borrowedRecords[recordIndex];

            // 중요 작업: 비밀번호 재확인
            const password = prompt("⚠️ 중요한 작업입니다.\n관리자 비밀번호를 다시 입력하세요:");
            if (password === null) return; // 취소 시

            const isValid = await verifyAdminPassword(password);
            if (!isValid) {
                alert("비밀번호가 틀렸습니다.");
                return;
            }

            if (!confirm(`"${record.name}"님의 "${record.itemName}" 강제 반납을 처리하시겠습니까?`)) {
                return;
            }
            
            // 해당 물품 찾기
            const item = items.find(i => i.name === record.itemName);
            if (item) {
                item.stock += 1; // 재고 증가
            }
            
            // 대여 기록 삭제
            borrowedRecords.splice(recordIndex, 1);
            
            // 데이터 저장
            saveData();
            
            // 변경 로그 추가
            addChangeLog("강제 반납", `${record.name}(${record.studentId})의 ${record.itemName} 강제 반납 처리`);
            
            // 화면 업데이트
            renderAdminData();
            renderOverdueData();
            renderItems();
            
            alert(`${record.itemName} 강제 반납이 처리되었습니다.`);
        };

        // 물품 순서 변경 함수 (드래그 앤 드롭용)
        window.moveItemTo = (fromIndex, toIndex) => {
            if (fromIndex < 0 || fromIndex >= items.length) return;
            if (toIndex < 0 || toIndex >= items.length) return;
            if (fromIndex === toIndex) return;
            
            // 배열에서 위치 이동
            const [movedItem] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, movedItem);
            
            // 데이터 저장
            saveData();
            
            // 변경 로그 추가
            addChangeLog("물품 순서 변경", `${movedItem.name}의 순서 변경`);
            
            // 화면 업데이트
            renderAdminData();
            renderItems();
        };

        // 물품 순서 변경 함수 (버튼용 - 호환성 유지)
        window.moveItem = (index, direction) => {
            if (index < 0 || index >= items.length) return;
            
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= items.length) return;
            
            window.moveItemTo(index, newIndex);
        };

        // 물품 삭제 함수
        window.deleteItem = async (index) => {
            if (index < 0 || index >= items.length) return;

            const item = items[index];

            if (!confirm(`"${item.name}" 물품을 삭제하시겠습니까?`)) {
                return;
            }

            items.splice(index, 1);
            saveData();
            addChangeLog("물품 삭제", `${item.name} 삭제됨`);
            renderAdminData();
            renderItems();
            alert(`${item.name} 물품이 삭제되었습니다.`);
        };

        // 팝업 드래그 기능 공통 함수
        function makeDraggable(cardElement) {
            if (!cardElement) return;
            
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;
            let xOffset = 0;
            let yOffset = 0;

            function dragStart(e) {
                if (e.type === "touchstart") {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }

                if (e.target === cardElement || cardElement.contains(e.target)) {
                    isDragging = true;
                }
            }

            function drag(e) {
                if (!isDragging) return;

                e.preventDefault();

                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, cardElement);
            }

            function dragEnd() {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }

            function setTranslate(xPos, yPos, el) {
                el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }

            // 드래그 이벤트 리스너
            cardElement.addEventListener('mousedown', dragStart);
            cardElement.addEventListener('touchstart', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
        }

        // 모든 팝업에 드래그 기능 적용
        makeDraggable(userInfoCard);

        // Service Worker 등록 (PWA 지원)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./service-worker.js')
                    .then((registration) => {
                        console.log('Service Worker 등록 성공:', registration.scope);
                    })
                    .catch((error) => {
                        console.log('Service Worker 등록 실패:', error);
                    });
            });
        }

