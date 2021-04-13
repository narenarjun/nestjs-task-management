import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enum/task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':/id')
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id/status')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
