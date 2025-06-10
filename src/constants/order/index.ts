import { t } from '@/locales';

export const OrderStatus = [
  { value: 0, label: t('order.status.completed'), color: 'green' }, // 已完成
  { value: 1, label: t('order.status.inProgress'), color: 'blue' }, // 进行中
  { value: 2, label: t('order.status.queued'), color: 'orange' }, // 排队中
  { value: 3, label: t('order.status.waiting'), color: 'gold' }, // 等待中
  { value: 4, label: t('order.status.cancelled'), color: 'red' }, // 已取消
];
