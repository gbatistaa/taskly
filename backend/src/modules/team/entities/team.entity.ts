import { isSQLite } from 'src/data/database.config';
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
import { TaskColumn } from 'src/modules/task-column/entities/task-column.entity';

@Entity()
@Unique(['ownerId', 'name'])
export class Team extends CommonEntity implements TeamInterface {
  @ManyToOne(() => User, (user) => user.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'uuid', name: 'ownerId' })
  ownerId: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  name: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: true })
  company: string;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  description: string;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  teamMembers: TeamMember[];

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.team)
  taskColumns: TaskColumn[];
}
