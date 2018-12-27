import { Task } from '@app/models/task';

export type IMission = Partial<Mission>;

export class Mission {
  id: string;
  name: string;
  caseId: string;
  caseName?: string;
  description: string;
  status: 'completed' | 'ready' | 'active';
  createdBy: string;
  createdAt: Date;
  activatedAt: Date;
  archivedAt: Date;
  duration: number;
  sourceIds: string[];
  dataVol?: number;
  tasks?: Task[];
  constructor(options: IMission) {
    this.id = options.id || undefined;
    this.name = options.name || undefined;
    this.caseId = options.caseId || undefined;
    this.description = options.description || undefined;
    this.status = options.status || 'ready';
    this.createdBy = options.createdBy || undefined;
    this.createdAt = options.createdAt || new Date();
    this.activatedAt = options.activatedAt || undefined;
    this.archivedAt = options.archivedAt || undefined;
    this.duration = options.duration || undefined;
    this.sourceIds = options.sourceIds || [];
    this.dataVol = undefined;
    this.tasks = options.tasks || [];
    this.caseName = options.caseName || undefined;
  }
}
