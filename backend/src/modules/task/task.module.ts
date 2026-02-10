import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskGateway } from './task.gateway';
import { TaskColumnModule } from '../task-column/task-column.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskColumnModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway],
  exports: [TaskService],
})
export class TaskModule {}
