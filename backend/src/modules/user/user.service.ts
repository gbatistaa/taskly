import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all user`;
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
