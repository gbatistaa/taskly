import { IsHexColor, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;

  @IsNumber()
  position: number;

  @IsUUID()
  teamId: string;
}
