import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { CryptographyUtils } from '../common/utils/cryptography-utils';
import { User } from './entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof User {
    return User;
  }

  async beforeInsert(
    event: InsertEvent<User>,
  ): Promise<Promise<Promise<any> | void>> {
    const entity: User = event.entity;

    console.log(`Subscriber antes da inserção de ${JSON.stringify(entity)}`);

    // Generating the user salt:
    entity.salt = await CryptographyUtils.generateSalt();

    // Cryptographying the user password before storing in the database:
    entity.password = await CryptographyUtils.generateHash(
      entity.password,
      entity.salt,
    );
  }
}
