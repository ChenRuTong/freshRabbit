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
          component: () => import('../views/atHome.vue'),
        },
        {
          path: 'miscellaneous',
          name: 'miscellaneous',
          component: () => import('../views/miscellaneous.vue'),
        },
        {
          path: 'motion',
          name: 'motion',
          component: () => import('../views/motion.vue'),
        },
        {
          path: 'delicacy',
          name: 'delicacy',
          component: () => import('../views/delicacy.vue'),
        },
        {
          path: 'dress',
          name: 'dress',
          component: () => import('../views/dress.vue'),
        },
        {
          path: 'motherBaby',
          name: 'motherBaby',
          component: () => import('../views/motherBaby.vue'),
        },
        {
          path: 'numericalCode',
          name: 'numericalCode',
          component: () => import('../views/numericalCode.vue'),
        },
        {
          path: 'strictSelection',
          name: 'strictSelection',
          component: () => import('../views/strictSelection.vue'),
        },
        {
          path: 'personalCare',
          name: 'personalCare',
          component: () => import('../views/personalCare.vue'),
        },
      ],
    },
  ],
})

export default router
