export interface StationStatus {
  status: number
  currentChargeCount: number
  currentChargeTime: number
  currentChargeAmount: number
}

export interface StationSlot {
  status: StationStatus
  waitingTime: number
  queue: number[]
}

export interface StationReport {
  updatedAt: string
  totalChargeCount: number
  totalChargeTime: number
  totalChargeAmount: number
  totalChargeFee: number
  totalServiceFee: number
  totalFee: number
}

export interface StationType {
  queriedAt: string
  id: number
  name: string
  description: string
  mode: number
  power: number
  serviceFee: number
  peakPrice: number
  normalPrice: number
  valleyPrice: number
  maxQueueLength: number
  slot: StationSlot
  report: StationReport
}

export interface StationUpsertPayload {
  id?: number
  name: string
  description: string
  mode: number
  power: number
  serviceFee: number
  peakPrice: number
  normalPrice: number
  valleyPrice: number
  maxQueueLength: number
}
