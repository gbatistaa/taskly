import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskColumn } from './entities/task-column.entity';
import { Repository } from 'typeorm';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { TaskColumnGateway } from './task-column.gateway';

@Injectable()
export class TaskColumnService {
  constructor(
    @InjectRepository(TaskColumn) private repo: Repository<TaskColumn>,
    private readonly gateway: TaskColumnGateway,
  ) {}

  async create(createTaskColumnDto: CreateTaskColumnDto): Promise<TaskColumn> {
    try {
      const position = await this.repo.count({
        where: { teamId: createTaskColumnDto.teamId },
      });

      const taskColumn = this.repo.create({
        ...createTaskColumnDto,
        position,
      });
      const dbTaskColumn = await this.repo.save(taskColumn);

      this.gateway.emitCreate(dbTaskColumn.teamId, dbTaskColumn);

      return dbTaskColumn;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task column creation',
      );
    }
  }

  async findAll(teamId: string): Promise<TaskColumn[]> {
    try {
      const foundTaskColumns = await this.repo.find({
        where: { teamId },
        order: {
          position: 'ASC',
        },
      });

      if (!foundTaskColumns) {
        throw new NotFoundException('Task columns not found');
      }

      return foundTaskColumns;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task column find',
      );
    }
  }

  async findOne(id: string): Promise<TaskColumn> {
    try {
      const foundTaskColumn = await this.repo.findOne({
        where: { id },
        relations: ['tasks'],
      });

      if (!foundTaskColumn) {
        throw new NotFoundException('Task column not found');
      }

      return foundTaskColumn;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task column find',
      );
    }
  }

  async update(id: string, updateTaskColumnDto: UpdateTaskColumnDto) {
    try {
      const entity = await this.repo.preload({
        id,
        ...updateTaskColumnDto,
      });

      if (!entity) {
        throw new NotFoundException('Task column not found');
      }

      const updatedColumn = await this.repo.save(entity);

      this.gateway.emitUpdate(updatedColumn.teamId, updatedColumn);

      return updatedColumn;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task column update',
      );
    }
  }

  async remove(id: string) {
    try {
      const taskColumnToRemove = await this.repo.findOneBy({ id });

      if (!taskColumnToRemove) {
        throw new NotFoundException('Task column to remove was not found');
      }

      await this.repo.remove(taskColumnToRemove);
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on task column removal',
      );
    }
  }
}
