import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
