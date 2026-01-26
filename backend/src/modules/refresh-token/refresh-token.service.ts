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

      throw new InternalServerErrorException('Failed to create refresh token');
    }
  }

  async findAll(): Promise<RefreshTokenDto[] | null> {
    try {
      const tokens = await this.repo.find();
      if (!tokens || tokens.length === 0) {
        return null;
      }
      const tokensDtos = tokens.map((token) => {
        return plainToInstance(RefreshTokenDto, token);
      });

      return tokensDtos;
    } catch (error: unknown) {
      treatKnownErrors(error);
      throw new InternalServerErrorException(
        'Failed to retrieve refresh tokens',
      );
    }
  }

  async findOne<K extends keyof RefreshTokenDto>(
    prop: K,
    value: RefreshTokenDto[K],
  ): Promise<RefreshTokenDto | null> {
    try {
      const token = await this.repo.findOne({ where: { [prop]: value } });

      if (!token) {
        return null;
      }

      return plainToInstance(RefreshTokenDto, token);
    } catch (error) {
      treatKnownErrors(error);
      throw new InternalServerErrorException('Failed to find refresh token');
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

      throw new InternalServerErrorException('Failed to remove refresh token');
    }
  }
}
