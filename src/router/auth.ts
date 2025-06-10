const authRoutes = [
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword/index.vue'),
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('@/views/SignIn/index.vue'),
  },
  {
    path: '/register',
    name: 'SignUp',
    component: () => import('@/views/SignUp/index.vue'),
  },
];

export default authRoutes;
