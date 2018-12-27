
export interface Intl {
  name: string;
  progress: number;
  idx: number;
  id: string;
  status: string;
  mandatory: boolean;
}

export interface Time {
  elapsed: number;
  eta: number;
  lostConnection: number;
}

export interface Trafic {
  sent: string;
  total: number;
}

export interface Datum {
  key: string;
  value: string;
}

export interface Progress {
  percentage: number;
  time: Time;
  trafic: Trafic;
}

export interface Indicators {
  battery: number;
  wifi: number;
}

export type ISource = Partial<Source>;

export class Source {
  id: string;
  status: string;
  name: string;
  vector: string;
  intls: Intl[];
  profileImages: string[];
  indicators: Indicators;
  progress: Progress;
  data: Datum[];
  number: string;
  deviceModel: string;
  deviceVersion: string;
  missionId: string;
  dataVol?: number;
  createdAt?: string;
  endedAt?: string;
  constructor(options: ISource) {
    this.id = options.id || undefined;
    this.status = options.status || undefined;
    this.name = options.name || undefined;
    this.vector = options.vector || undefined;
    this.intls = options.intls || [];
    this.profileImages = options.profileImages || [];
    this.indicators = options.indicators || undefined;
    this.progress = options.progress || undefined;
    this.data = options.data || [];
    this.number = options.number || undefined;
    this.deviceModel = options.deviceModel || undefined;
    this.deviceVersion = options.deviceVersion || undefined;
    this.missionId = options.missionId || undefined;
    this.createdAt = options.createdAt || undefined;
    this.endedAt = options.endedAt || undefined;
  }
}
