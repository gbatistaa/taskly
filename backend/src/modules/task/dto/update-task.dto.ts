import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsString()
  @MaxLength(255)
  description?: string;

  @IsUUID()
  columnId?: string;
}
