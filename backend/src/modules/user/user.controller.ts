import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get('find')
  findAll() {
    return this.userService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne('id', id);
  }

  @Get('find-user-teams/:id')
  findUserTeams(@Param('id') id: string) {
    return this.userService.findAllUserTeams(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
