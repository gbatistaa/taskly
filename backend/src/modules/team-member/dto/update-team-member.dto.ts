import { PartialType } from '@nestjs/swagger';
import { TeamRoles } from 'src/modules/common/enums/Roles';
import { CreateTeamMemberDto } from './create-team-member.dto';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
  teamRole?: TeamRoles | undefined;
}
