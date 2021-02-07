import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Task, TaskStatus } from '../models/task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
