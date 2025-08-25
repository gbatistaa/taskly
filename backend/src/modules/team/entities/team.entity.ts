import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { TeamMember } from 'src/modules/team-member/entities/team-member.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { TeamInterface } from '../interfaces/team.interface';

@Entity()
@Unique(['ownerId', 'name'])
export class Team extends CommonEntity implements TeamInterface {
  @ManyToOne(() => User, (user) => user.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'uuid', name: 'ownerId' })
  ownerId: string;

  @Column({ type: 'citext', nullable: false })
  name: string;

  @Column({ type: 'citext', nullable: true })
  company: string;

  @Column({ type: 'citext', nullable: false })
  description: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  teamMembers: TeamMember[];
}
