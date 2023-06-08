import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import home from '../views/home/index.vue'
import layout from '../layout/index.vue'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login/:fromPath?',
      name: 'login',
      component: Login,
    },
    {
      path: '/layout',
      name: 'layout',
      redirect: '/layout/home',
      component: layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
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
        {
          path: 'orderPage',
          name: 'orderPage',
          component: () => import('../views/orderPage/index.vue'),
        },
        {
          path: 'pay/:id',
          name: 'pay',
          component: () => import('../views/pay/index.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

const permissionList = ['orderPage', 'pay']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const useUser = useUserStore()
  if (useUser.userInfo.token) {
    if (to.path === '/login') {
      next('/layout/home')
    }
  } else {
    permissionList.forEach((item, index) => {
      if (to.name === item) {
        console.log(from)
        //@ts-ignore
        ElMessage({
          message: `需要登录才可以下单`,
          type: 'warning',
        })
        next({
          name: 'login',
          params: { fromPath: from.path },
        })
      }
    })
  }
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})
export default router
