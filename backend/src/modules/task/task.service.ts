import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { TaskColumnService } from '../task-column/task-column.service';
import { TaskGateway } from './task.gateway';
import type { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
    private readonly taskColumnService: TaskColumnService,
    private readonly taskGateway: TaskGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto, req: AuthenticatedRequest) {
    const { user } = req;
    try {
      const position = await this.repo.count({
        where: { columnId: createTaskDto.columnId },
      });

      const task = this.repo.create({
        ...createTaskDto,
        position,
        creatorId: user?.id,
      });

      const savedTask = await this.repo.save(task);

      this.taskGateway.emitCreate(savedTask.columnId, {
        ...savedTask,
        description: savedTask.description ?? '',
      });

      return savedTask;
    } catch (error: unknown) {
      console.log(error);
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task creation',
      );
    }
  }

  async findAll(columnId: string): Promise<Task[]> {
    try {
      const column = await this.taskColumnService.findOne(columnId);

      if (!column) {
        throw new NotFoundException('Column not found');
      }

      return this.repo.find({
        where: { columnId },
        order: { position: 'ASC' },
      });
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task retrieval',
      );
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.repo.findOne({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task retrieval',
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.repo.preload({
        id,
        ...updateTaskDto,
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const updatedTask = await this.repo.save(task);
      const columnId = updatedTask.columnId;

      this.taskGateway.emitUpdate(columnId, {
        ...updatedTask,
        description: updatedTask.description ?? '',
      });

      return updatedTask;
    } catch (error: unknown) {
      console.log(error);
      treatKnownErrors(error);
      throw new InternalServerErrorException('Unexpected error on task update');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const task = await this.repo.findOne({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const columnId = task.columnId;

      this.taskGateway.emitDelete(columnId, id);

      await this.repo.remove(task);
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task deletion',
      );
    }
  }
}
