import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Team } from './entities/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { User } from '../user/entities/user.entity';
import { TaskColumnModule } from '../task-column/task-column.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, User]),
    UserModule,
    TaskColumnModule,
  ],
  controllers: [TeamController],
  providers: [TeamService, JwtService],
  exports: [TeamService],
})
export class TeamModule {}
