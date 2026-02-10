import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreatableTaskInterface } from '../interfaces/creatable-task.interface';

export class CreateTaskDto implements CreatableTaskInterface {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  columnId: string;
}
