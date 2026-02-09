import { IsHexColor, IsString, IsUUID } from 'class-validator';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;

  @IsUUID()
  teamId: string;
}
