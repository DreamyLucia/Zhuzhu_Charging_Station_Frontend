const mainAppRouters = [
  {
    path: '/written-test',
    name: 'WrittenTestPage',
    component: () => import('@/views/App/WrittenTest/index.vue'),
  },
];

export default mainAppRouters;
