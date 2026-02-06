import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
