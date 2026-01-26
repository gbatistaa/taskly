import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { type RefreshRequest } from '../auth/interfaces/refresh-request.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('')
  create(@Body() createTeamDto: CreateTeamDto, @Req() req: RefreshRequest) {
    return this.teamService.create(createTeamDto, req);
  }

  @Get('')
  findAll() {
    return this.teamService.findAll();
  }

  @Get('/find-with-name/:name')
  findTeamByName(@Param('name') name: string) {
    return this.teamService.findTeams('name', name);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.teamService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
