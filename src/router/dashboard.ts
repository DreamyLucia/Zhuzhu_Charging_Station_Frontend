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
      /*
        {
          path: 'order-detail',
          name: 'OrderDetail',
          component: () => import('@/components/MainApp/OrderDetail/index.vue'),
          meta: {
            showHome: false,
          },
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/components/Setting/index.vue'),
          meta: {
            showHome: false,
          },
        },
        */
    ],
  },
];

export default dashboardRouters;
