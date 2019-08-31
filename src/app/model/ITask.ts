import { TaskStatus } from './ITaskStatus';
import { TimeRecord } from './ITimeRecord';

export interface Task {
  id: string;
  title: string;
  reference: string;
  description: string;
  timeWorked: TimeRecord[];
  status: TaskStatus;
  visible?: boolean;
}

export interface TaskFromDB extends Task {
  _id: {
    $oid: string;
  };
}
