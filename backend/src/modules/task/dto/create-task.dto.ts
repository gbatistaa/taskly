import { IsString, IsUUID, MaxLength } from 'class-validator';
import { CreatableTaskInterface } from '../interfaces/creatable-task.interface';

export class CreateTaskDto implements CreatableTaskInterface {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsUUID()
  columnId: string;
}
