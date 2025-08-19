import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
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

  @Get('find')
  findOne(@Body() user_id: string) {
    return this.refreshTokenService.findOne(user_id);
  }

  @Delete('delete')
  remove(@Body() user_id: string) {
    return this.refreshTokenService.remove(user_id);
  }
}
