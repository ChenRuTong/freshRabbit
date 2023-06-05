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
        {
          path: 'category/sub/:id',
          name: 'screen',
          component: () => import('../views/screen/index.vue'),
        },
        {
          path: 'category/sub/:id',
          name: 'screen',
          component: () => import('../views/screen/index.vue'),
        },
        {
          path: 'details/:id',
          name: 'details',
          component: () => import('../views/details/index.vue'),
        },
        {
          path: 'cartList',
          name: 'cartList',
          component: () => import('../views/cartList/index.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
