import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PAGE_ROUTE, { publicPath } from "@/const/pageRoute";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterViewVue from '@/views/auth/RegisterView.vue';
import LayoutViewVue from '@/views/LayoutView.vue';
import ListUserVue from '@/views/user/ListUser.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/",
      name: "layout",
      component: LayoutViewVue,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: '/employees',
          name: 'employees',
          component: ListUserVue
        },
        
      ]
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: PAGE_ROUTE.LOGIN,
      name: "login",
      component: LoginView,
    },
    {
      path: PAGE_ROUTE.REGISTER,
      name: "register",
      component: RegisterViewVue,
    },
    
  ]
})

export default router
