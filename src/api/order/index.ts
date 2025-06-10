import { api } from '@/api/api';

// 获取用户所有订单信息
export const getOrdersApi = async () => {
  try {
    const response = await api.get('/api/users/orders');
    return response.data;
  }
  catch (error) {
    console.error('获取订单信息网络接口错误', error);
    throw error;
  }
};
