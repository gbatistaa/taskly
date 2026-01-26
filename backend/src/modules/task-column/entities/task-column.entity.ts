import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { Task } from 'src/modules/task/entities/task.entity';

@Entity()
export class TaskColumn extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 7, nullable: false, default: '#6366f1' })
  color: string;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];
}
