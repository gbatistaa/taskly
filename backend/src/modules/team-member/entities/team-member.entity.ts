import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { TeamRoles } from 'src/modules/common/enums/Roles';
import { Team } from 'src/modules/team/entities/team.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { TeamMemberInterface } from '../interfaces/team-member.interface';

@Entity()
@Unique(['userId', 'teamId'])
export class TeamMember extends CommonEntity implements TeamMemberInterface {
  role: TeamRoles;
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  teamId: string;

  @ManyToOne(() => Team, (team) => team.teamMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({
    type: 'enum',
    enum: TeamRoles,
    default: TeamRoles.MEMBER,
    nullable: false,
  })
  teamRole: TeamRoles;
}
