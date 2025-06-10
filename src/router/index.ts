import { createRouter, createWebHistory } from 'vue-router';
import introduceRouters from './introduce';
import authRoutes from './auth';

const publicPath = import.meta.env.VITE_PUBLIC_BASE || '/';

const router = createRouter({
  history: createWebHistory(publicPath),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/index.vue'),
    },
    ...introduceRouters,
    ...authRoutes,
  ],
});

export default router;
