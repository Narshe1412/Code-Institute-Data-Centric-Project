import { TaskStatus } from './ITaskStatus';
import { TaskTime } from './ITaskTime';

export interface Task {
  id: number;
  title: string;
  reference: string;
  description: string;
  timeWorked: TaskTime[];
  status: TaskStatus;
  visible?: boolean;
}
