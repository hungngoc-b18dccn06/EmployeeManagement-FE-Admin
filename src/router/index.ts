import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PAGE_ROUTE, { publicPath } from "@/const/pageRoute";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterViewVue from '@/views/auth/RegisterView.vue';
import LayoutViewVue from '@/views/LayoutView.vue';
import ListEmployee from '@/views/user/ListEmployee.vue';
import DetailEmployee from '@/views/user/DetailEmployee.vue'
import ListEcormmerce from '@/views/ecommerce/ListEcommerce.vue'
import ListOrderVue from '@/views/orderEmployee/ListOrder.vue';
import OrderDetailVue from '@/views/order/OrderDetail.vue';
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
          component: ListEmployee
        },
        {
          path: '/employee/:id/detail',
          name: 'DetailEmployee',
          component: DetailEmployee
        },
        {
          path: '/ecommerce_manage',
          name: 'ListEcormmerce',
          component: ListEcormmerce
        },
        {
          path: '/ecommerce_order',
          name: 'ListOrderVue',
          component: ListOrderVue
        },
        {
          path: '/order_detail',
          name: 'OrderDetailVue',
          component: OrderDetailVue
        }
        
      ]
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
