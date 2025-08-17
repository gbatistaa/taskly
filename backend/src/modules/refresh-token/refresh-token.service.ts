import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { treatKnownErrors } from '../auth/errors/treatErrorCustomized';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken) private repo: Repository<RefreshToken>,
  ) {}

  async create(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): Promise<CreateRefreshTokenDto> {
    try {
      const token = this.repo.create(createRefreshTokenDto);
      const dbToken = await this.repo.save(token);

      return plainToInstance(CreateRefreshTokenDto, dbToken);
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all refreshToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshToken`;
  }

  async remove(userId: string) {
    try {
      const tokenToRemove = await this.repo.findOne({
        where: { userId: userId },
      });

      if (!tokenToRemove) {
        throw new NotFoundException('Token does not exist');
      }

      await this.repo.remove(tokenToRemove);
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}
