import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/trades',
      name: 'Trade',
      component: () => import('../views/TradeView.vue'),
    },
    {
      path: '/lostFounds',
      name: 'LostFound',
      component: () => import('../views/LostFoundView.vue'),
    },
    {
      path: '/groupBuys',
      name: 'GroupBuy',
      component: () => import('../views/GroupBuyView.vue'),
    },
    {
      path: '/errands',
      name: 'Errand',
      component: () => import('../views/ErrandView.vue'),
    },
    {
      path: '/publish',
      name: 'Publish',
      component: () => import('../views/PublishView.vue'),
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/MessageView.vue'),
    },
    {
      path: '/user',
      name: 'UserCenter',
      component: () => import('../views/UserCenterView.vue'),
    },
  ],
})

export default router
