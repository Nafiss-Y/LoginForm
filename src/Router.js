import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router