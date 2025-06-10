import {
  CloseCircleOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue';
import { t } from '@/locales';

export const StationStatus = [
  { value: 0, label: t('stationCard.status.idle'), color: 'green', icon: SmileOutlined },
  { value: 1, label: t('stationCard.status.charging'), color: 'red', icon: LoadingOutlined },
  { value: 2, label: t('stationCard.status.closed'), color: 'gray', icon: CloseCircleOutlined },
  { value: 3, label: t('stationCard.status.error'), color: 'yellow', icon: ExclamationOutlined },
];

export interface ModeOption {
  value: number
  label: string
}

export const StationMode: ModeOption[] = [
  { value: 0, label: t('stationCard.mode.slow') },
  { value: 1, label: t('stationCard.mode.fast') },
]
