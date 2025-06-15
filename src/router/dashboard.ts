const dashboardRouters = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/components/Station/index.vue'),
      },
      {
        path: 'orders',
        name: 'OrdersPage',
        component: () => import('@/components/Orders/index.vue'),
      },
      {
        path: 'manage',
        name: 'ManagePage',
        component: () => import('@/components/Manage/index.vue'),
      },
    ],
  },
];

export default dashboardRouters;
