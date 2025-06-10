export interface OrderType {
  id: string;
  userId: number;
  chargingStationId: number;
  mode: number;
  queueNo: number | null;
  recordTime: string;
  status: number;
  chargeAmount: number;
  actualCharge: number;
  chargeDuration: number;
  startTime: string;
  stopTime: string;
  chargeFee: number;
  serviceFee: number;
  totalFee: number;
}
