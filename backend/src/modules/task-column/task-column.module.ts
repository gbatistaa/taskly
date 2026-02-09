import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskColumnService } from './task-column.service';
import { TaskColumnController } from './task-column.controller';
import { TaskColumn } from './entities/task-column.entity';
import { TaskColumnGateway } from './task-column.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TaskColumn])],
  controllers: [TaskColumnController],
  providers: [TaskColumnService, TaskColumnGateway],
  exports: [TaskColumnService],
})
export class TaskColumnModule {}
