export type ICase = Partial<Case>;

export class Case {
  id: string;
  name: string;
  status: 'active' | 'archived';
  createdBy: string;
  createdAt: Date;
  missionIds: string[];
  sourcesNo?: number;
  dataVol?: number;
  isActive?: boolean;
  description?: string;
  public isActiveMission?: boolean;
  constructor(options: ICase) {
    this.id = options.id || undefined;
    this.name = options.name || undefined;
    this.status = options.status || 'active';
    this.createdBy = options.createdBy || undefined;
    this.createdAt = options.createdAt || new Date();
    this.missionIds = options.missionIds || [];
    this.sourcesNo = undefined;
    this.dataVol = undefined;
    this.isActive = undefined;
    this.isActiveMission = undefined;
    this.description = options.description || undefined;
  }
}
