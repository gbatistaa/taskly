import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessTokenPayload } from '../auth/interfaces/access-token-payload.interface';
import { RefreshRequest } from '../auth/interfaces/refresh-request.interface';
import { TeamRoles } from '../common/enums/Roles';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TeamMemberService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(TeamMember) private repo: Repository<TeamMember>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(
    createTeamMemberDto: CreateTeamMemberDto,
    req: RefreshRequest,
  ): Promise<TeamMember> {
    const { accessToken } = req.cookies;

    try {
      const payload: AccessTokenPayload = this.jwtService.verify(accessToken);

      const teamMember = this.repo.create(createTeamMemberDto);
      teamMember.userId = payload.id;

      if (teamMember.teamRole === TeamRoles.OWNER) {
        const members = await this.findAllTeamMembers(teamMember.teamId);

        if (members.some((m) => m.teamRole === TeamRoles.OWNER)) {
          throw new ConflictException('A team can only have one owner');
        }
      }

      return await this.repo.save(teamMember);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on team member creation',
      );
    }
  }

  async findAllTeamMembers(teamId: string) {
    try {
      const dbTeamMembers = await this.repo.find({ where: { teamId: teamId } });
      return dbTeamMembers;
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on team members search',
      );
    }
  }

  async findOne(id: string): Promise<TeamMember | undefined> {
    try {
      const teamMember = await this.repo.findOne({ where: { id } });

      if (!teamMember) {
        throw new NotFoundException(`Team member with id ${id} was not found!`);
      }

      return teamMember;
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException('Failed to find team member');
    }
  }

  async update(
    userId: string,
    updateTeamMemberDto: UpdateTeamMemberDto,
  ): Promise<TeamMember> {
    try {
      const memberToUpdate = await this.repo.findOne({ where: { userId } });
      if (!memberToUpdate) {
        throw new NotFoundException(
          `Team member with id ${userId} was not found!`,
        );
      }

      memberToUpdate.teamRole = updateTeamMemberDto.teamRole!;

      return await this.repo.save(memberToUpdate);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on the member team update',
      );
    }
  }

  async remove(id: string) {
    try {
      const teamMemberToRemove = await this.repo.findOne({ where: { id } });

      if (!teamMemberToRemove) {
        throw new NotFoundException('Team member not found!');
      }

      await this.repo.delete(teamMemberToRemove);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException('Error on removing team member');
    }
  }
}
