import { IsHexColor, IsString } from 'class-validator';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
