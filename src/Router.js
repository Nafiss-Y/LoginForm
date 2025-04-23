import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './Store.js'

const routes = [
  {
    path: '/',
    component: () => import('./components/HomeView.vue')
  },
  {
    path: '/login',
    component: () => import('./components/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('./components/RegisterPage.vue')
  },
  {
    path: '/dashboard',
    component: () => import('./components/DashboardPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()

    if (!userStore.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router