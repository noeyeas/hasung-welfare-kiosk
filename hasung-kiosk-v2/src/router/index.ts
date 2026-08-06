import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ItemSelection from '../views/ItemSelection.vue'
import Admin from '../views/Admin.vue'
import { useAuthStore } from '../stores/authStore'

const router = createRouter({
  // 키오스크는 정적 호스팅(GitHub Pages 등)에 올라가므로 서버 rewrite가 필요 없는 hash 모드 사용
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/items', name: 'items', component: ItemSelection, meta: { requiresUser: true } },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

// 로그인하지 않은 상태로 물품 화면에 직접 접근하는 것을 차단
router.beforeEach((to) => {
  if (to.meta.requiresUser) {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return { name: 'home' }
  }
  return true
})

export default router
