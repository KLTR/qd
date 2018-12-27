export interface TimeRange {
  from: Date;
  to: Date;
}

export interface TaskDefaults {
  timeRange: TimeRange;
}

export interface SubTaskDefaults {
  checked?: boolean;
  locked?: boolean;
}

export interface SubTask {
  id: string;
  name: string;
  defaults: SubTaskDefaults;
}

export class Task {
  id: string;
  sourceId: string;
  name: string;
  idx: number;
  status: string;
  hasIntl: boolean;
  mandatory: boolean;
  defaults: TaskDefaults;
  tooltip: string;
  subTasks: SubTask[];
  updatedAt: Date;
  progress: number;
  download: number;
  taskId: string;
}
