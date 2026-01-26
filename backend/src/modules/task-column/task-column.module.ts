import { Module } from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { TaskColumnController } from './task-column.controller';

@Module({
  controllers: [TaskColumnController],
  providers: [TaskColumnService],
})
export class TaskColumnModule {}
