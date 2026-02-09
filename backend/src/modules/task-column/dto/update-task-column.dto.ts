import { PartialType } from '@nestjs/swagger';
import { CreateTaskColumnDto } from './create-task-column.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTaskColumnDto extends PartialType(CreateTaskColumnDto) {
  @IsNumber()
  @IsOptional()
  position?: number;
}
