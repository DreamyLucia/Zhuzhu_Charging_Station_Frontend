import type { StationType } from '@/types/station'

export function getUnitPrice(station: StationType): number {
  // 解析 queriedAt 时间戳为 Date 对象
  const queriedDate = new Date(station.queriedAt);

  // 获取当前时间的小时和分钟
  const hours = queriedDate.getHours();

  // 定义峰时、谷时和平常时段
  const isPeak
    = (hours >= 10 && hours < 15) || (hours >= 18 && hours < 21);
  const isValley = hours >= 23 || hours < 7;

  // 根据时间段返回对应的电价
  if (isPeak)
    return station.peakPrice;
  else if (isValley)
    return station.valleyPrice;
  else
    return station.normalPrice;
}
