import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMemberService } from './team-member.service';

@Controller('team-member')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post('create')
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMemberService.create(createTeamMemberDto);
  }

  @Get('find')
  findAll() {
    return this.teamMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMemberService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    return this.teamMemberService.update(+id, updateTeamMemberDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.teamMemberService.remove(+id);
  }
}
