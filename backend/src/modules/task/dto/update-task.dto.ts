import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title?: string;

  @IsString()
  @MaxLength(255)
  @MinLength(3)
  description?: string;

  @IsUUID()
  @IsOptional()
  columnId?: string;

  @IsNumber()
  @IsOptional()
  position?: number;
}
