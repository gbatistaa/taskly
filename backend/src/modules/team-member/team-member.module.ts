import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TeamMember } from './entities/team-member.entity';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberService } from './team-member.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, User]), AuthModule],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}
