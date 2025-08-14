import { CommonEntity } from 'src/modules/common/entities/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RefreshTokenInterface } from '../interfaces/refresh-token.interface';

@Entity()
export class RefreshToken
  extends CommonEntity
  implements RefreshTokenInterface
{
  @ManyToOne(() => User, (user) => user.id)
  user_id: string;

  @Column({ type: 'citext', nullable: false })
  token_hash: string;
}
