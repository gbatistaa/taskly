import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { TeamInterface } from '../interfaces/team.interface';

@Entity()
export class Team extends CommonEntity implements TeamInterface {
  @OneToOne(() => User, (owner) => owner.id)
  @JoinTable()
  ownerId: string;

  @Column({ type: 'citext', nullable: false })
  name: string;

  @Column({ type: 'citext', nullable: true })
  company: string;

  @Column({ type: 'citext', nullable: false })
  description: string;
}
