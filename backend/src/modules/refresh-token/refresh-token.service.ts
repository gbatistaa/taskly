import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
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

  async findAll(): Promise<RefreshTokenDto[]> {
    try {
      const tokens = await this.repo.find();
      if (!tokens) {
        throw new NotFoundException('The refresh tokens table is empty');
      }
      const tokensDtos = tokens.map((token) => {
        return plainToInstance(RefreshTokenDto, token);
      });

      return tokensDtos;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(userId: string): Promise<RefreshTokenDto> {
    try {
      const token = await this.repo.findOne({ where: { userId: userId } });
      return plainToInstance(RefreshTokenDto, token);
    } catch (error) {
      treatKnownErrors(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(userId: string): Promise<RefreshTokenDto> {
    try {
      const tokenToRemove = await this.repo.findOne({
        where: { userId: userId },
      });

      if (!tokenToRemove) {
        throw new NotFoundException('Token does not exist');
      }

      const removed = await this.repo.remove(tokenToRemove);
      return plainToInstance(RefreshTokenDto, removed);
    } catch (error) {
      treatKnownErrors(error);

      throw new InternalServerErrorException();
    }
  }
}
