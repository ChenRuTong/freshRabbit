import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'home',
      component: Login,
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: '/layout/home',
      component: () => import('../layout/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/home/index.vue'),
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('../views/category/index.vue'),
        },
      ],
    },
  ],
})

export default router
