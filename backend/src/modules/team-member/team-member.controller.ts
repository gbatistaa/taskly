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
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { TeamMemberService } from './team-member.service';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Controller('team-member')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post('')
  create(
    @Body() createTeamMemberDto: CreateTeamMemberDto,
    @Req() req: RefreshRequest,
  ) {
    return this.teamMemberService.create(createTeamMemberDto, req);
  }

  @Get(':teamId')
  findAllTeamMembers(@Param('teamId') teamId: string) {
    return this.teamMemberService.findAllTeamMembers(teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMemberService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teamMemberService.update(id, updateTeamMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMemberService.remove(id);
  }
}
