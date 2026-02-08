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

@Injectable()
export class TaskColumnService {
  constructor(
    @InjectRepository(TaskColumn) private repo: Repository<TaskColumn>,
  ) {}

  async create(createTaskColumnDto: CreateTaskColumnDto): Promise<TaskColumn> {
    try {
      const taskColumn = this.repo.create(createTaskColumnDto);
      const dbTaskColumn = await this.repo.save(taskColumn);

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
      const taskColumnToUpdate = await this.repo.findOneBy({ id });

      if (!taskColumnToUpdate) {
        throw new NotFoundException('Task column to update was not found');
      }

      taskColumnToUpdate.name = updateTaskColumnDto.name as string;
      taskColumnToUpdate.position = updateTaskColumnDto.position as number;

      await this.repo.save(taskColumnToUpdate);
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
