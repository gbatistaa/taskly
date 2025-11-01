import { isSQLite } from 'src/db/database.config';
import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { TeamMember } from 'src/modules/team-member/entities/team-member.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
@Unique(['cpf'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  cpf: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  email: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  password: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  firstName: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  lastName: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  username: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  salt: string;
  @Column({
    type: isSQLite ? 'datetime' : 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  birthDate: Date;

  // Times que ele possui (owner)
  @OneToMany(() => Team, (team) => team.owner)
  teams: Team[];

  // Times que ele participa (TeamMember)
  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMemberships: TeamMember[];
}
