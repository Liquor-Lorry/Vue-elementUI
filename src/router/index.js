import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video-manage/VideoManage.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/UserManage.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/other/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/other/PageTwo.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
