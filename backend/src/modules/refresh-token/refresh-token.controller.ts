import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { FindRefreshTokenDto } from './dto/find-refresh-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('create')
  create(@Body() createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.refreshTokenService.create(createRefreshTokenDto);
  }

  @Get('find-all')
  findAll() {
    return this.refreshTokenService.findAll();
  }

  @Post('find')
  async findOne(@Body() body: FindRefreshTokenDto): Promise<RefreshTokenDto> {
    const { prop, value } = body;
    return await this.refreshTokenService.findOne(
      prop as keyof RefreshTokenDto,
      value,
    );
  }
  @Delete('delete')
  remove(@Body() user_id: string) {
    return this.refreshTokenService.remove(user_id);
  }
}
