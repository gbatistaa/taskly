import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDTO> {
    try {
      const user = this.repo.create(createUserDto);
      const dbUser = await this.repo.save(user);

      return plainToInstance(UserDTO, dbUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const users = await this.repo.find();
    const dbUsers = users.map((user) => {
      return plainToInstance(UserDTO, user);
    });

    return dbUsers;
  }

  async findOneByEmail(
    email: string,
    withCredentials: boolean,
  ): Promise<UserDTO> {
    try {
      const foundUser = await this.repo.findOne({ where: { email: email } });

      if (!foundUser) {
        throw new NotFoundException();
      }

      return plainToInstance(UserDTO, foundUser, {
        groups: withCredentials ? ['withCredentials'] : [],
      });
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(error);
    }
  }

  async findOne<K extends keyof UserDTO>(prop: K, value: UserDTO[K]) {
    try {
      const foundUser = await this.repo.findOne({
        where: { [prop]: value },
      });

      if (!foundUser) {
        throw new NotFoundException('User not fount');
      }

      return plainToInstance(UserDTO, foundUser);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException('Unexpected error on user search');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userToUpdate = await this.repo.findOne({
        where: { id },
      });

      if (!userToUpdate) {
        throw new NotFoundException('User to update was not found');
      }

      userToUpdate.username = updateUserDto.username as string;
      userToUpdate.firstName = updateUserDto.firstName as string;
      userToUpdate.lastName = updateUserDto.lastName as string;

      await this.repo.save(userToUpdate);
    } catch (error: unknown) {
      treatKnownErrors(error);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
