import { api } from '@/api/api';
import type { StationUpsertPayload } from '@/types/station'

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

// 新建/修改充电桩
export const upsertStationApi = async (data: StationUpsertPayload) => {
  try {
    const response = await api.post('/api/charging-stations/upsert', data)
    return response.data
  }
  catch (error) {
    console.error('新建/修改充电桩网络接口错误', error);
    throw error;
  }
}

// 删除充电桩
export const deleteStationApi = async (id: number) => {
  try {
    const response = await api.delete(`/api/charging-stations/${id}`);
    return response.data;
  }
  catch (error) {
    console.error('删除充电桩网络接口错误', error);
    throw error;
  }
};

// 关闭充电桩
export const shutStationApi = async (id: number) => {
  try {
    const response = await api.put(`/api/charging-stations/${id}/shut`);
    return response.data;
  }
  catch (error) {
    console.error('关闭充电桩网络接口错误', error);
    throw error;
  }
};

// 开启充电桩
export const openStationApi = async (id: number) => {
  try {
    const response = await api.put(`/api/charging-stations/${id}/open`);
    return response.data;
  }
  catch (error) {
    console.error('开启充电桩网络接口错误', error);
    throw error;
  }
};

// 维修充电桩
export const fixStationApi = async (id: number) => {
  try {
    const response = await api.put(`/api/charging-stations/${id}/fix`);
    return response.data;
  }
  catch (error) {
    console.error('维修充电桩网络接口错误', error);
    throw error;
  }
};

// 损坏充电桩
export const breakStationApi = async (id: number) => {
  try {
    const response = await api.put(`/api/charging-stations/${id}/break`);
    return response.data;
  }
  catch (error) {
    console.error('损坏充电桩网络接口错误', error);
    throw error;
  }
};
