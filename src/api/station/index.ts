import { api } from '@/api/api';

// 获取所有充电桩信息
export const getAllStationApi = async () => {
  try {
    const response = await api.get('/api/charging-stations/all');
    return response.data;
  }
  catch (error) {
    console.error('获取充电桩信息网络接口错误', error);
    throw error;
  }
};
