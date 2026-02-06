import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Team } from 'src/modules/team/entities/team.entity';

@Entity()
@Unique(['teamId', 'position'])
export class TaskColumn extends CommonEntity {
  @Column({ type: 'uuid', nullable: false })
  teamId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 7, nullable: false, default: '#6366f1' })
  color: string;

  @Column({ type: 'int', nullable: false })
  position: number;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];

  @ManyToOne(() => Team, (team) => team.taskColumns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
