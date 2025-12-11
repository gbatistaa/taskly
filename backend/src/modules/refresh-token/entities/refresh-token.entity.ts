import { isSQLite } from 'src/data/database.config';
import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

@Entity()
export class RefreshToken
  extends CommonEntity
  implements RefreshTokenInterface
{
  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: isSQLite ? 'text' : 'citext', nullable: false })
  tokenHash: string;
}
