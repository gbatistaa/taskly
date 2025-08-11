import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { Column, Entity, Unique } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
@Unique(['cpf'])
@Unique(['email'])
export class User extends CommonEntity implements UserInterface {
  @Column({ type: 'text', nullable: false })
  cpf: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  firstName: string;

  @Column({ type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false })
  username: string;

  @Column({ type: 'text', nullable: false })
  salt: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  birthDate: Date;
}
