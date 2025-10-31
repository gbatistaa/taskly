import { Injectable } from '@nestjs/common';
import { UserDTO } from './modules/user/dto/user-dto';
import { UserService } from './modules/user/user.service';
import { UserInterface } from './modules/user/interfaces/user.interface';
import { createUsersMock } from './modules/common/utils/createUsersMock';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './modules/user/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUsersMock(): Promise<UserDTO[]> {
    const mocks: UserInterface[] = createUsersMock(
      '/home/gbatistadev/Documents/Coding/personal-projects/taskly/backend/src/modules/mocks.json',
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
