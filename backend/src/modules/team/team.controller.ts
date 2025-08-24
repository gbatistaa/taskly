import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { type RefreshRequest } from '../auth/interfaces/refresh-request.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  create(@Body() createTeamDto: CreateTeamDto, @Req() req: RefreshRequest) {
    return this.teamService.create(createTeamDto, req);
  }

  @Get('find')
  findAll() {
    return this.teamService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.teamService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamService.remove(+id);
  // }
}
