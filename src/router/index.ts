import { createRouter, createWebHistory } from 'vue-router';
import authRouters from './auth';
import dashboardRouters from './dashboard';

const publicPath = import.meta.env.VITE_PUBLIC_BASE || '/';

const router = createRouter({
  history: createWebHistory(publicPath),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index.vue'),
    },
    ...dashboardRouters,
    ...authRouters,
  ],
});

export default router;
