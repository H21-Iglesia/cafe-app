import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PedirPage from '../views/PedirPage.vue'
import PendientePage from '../views/PendientePage.vue'
import HomePage from '../views/HomePage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/pedir',
    name: 'Crear Pedido',
    component: PedirPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/pendientes',
    name: 'Pedidos Pendientes',
    component: PendientePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
