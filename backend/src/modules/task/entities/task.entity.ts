import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { TaskColumn } from 'src/modules/task-column/entities/task-column.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TaskInterface } from '../interfaces/task.interface';

@Entity()
export class Task extends CommonEntity implements TaskInterface {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', nullable: false })
  position: number;

  @Column({ type: 'uuid', nullable: false })
  columnId: string;

  @ManyToOne(() => TaskColumn, (column) => column.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'columnId' })
  column: TaskColumn;
}
