import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import path from 'path';
import { createUsersMock } from './modules/common/utils/createUsersMock';
import { CreateUserDto } from './modules/user/dto/create-user.dto';
import { UserDTO } from './modules/user/dto/user-dto';
import { UserInterface } from './modules/user/interfaces/user.interface';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUsersMock(): Promise<UserDTO[]> {
    console.log('woichoiwc');
    const mocks: UserInterface[] = createUsersMock(
      path.join(process.cwd(), 'src', 'modules', 'mocks.json'),
    );
    const createdUsers: UserDTO[] = [];

    for (const mock of mocks) {
      const newUser = await this.userService.create(
        plainToInstance(CreateUserDto, mock),
      );
      createdUsers.push(newUser);
    }

    console.log(createdUsers);

    return createdUsers;
  }
}
