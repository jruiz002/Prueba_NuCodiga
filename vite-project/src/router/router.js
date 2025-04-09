import { createRouter, createWebHistory } from 'vue-router';
import Factura from '../components/Factura.vue';

const routes = [
  { path: '/', component: Factura },
  { path: '/home', component: Factura },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
