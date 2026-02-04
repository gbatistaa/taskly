import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { AccessTokenPayload } from '../auth/interfaces/access-token-payload.interface';
import { RefreshRequest } from '../auth/interfaces/refresh-request.interface';
import { treatKnownErrors } from '../common/errors/treatErrorCustomized';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDTO } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { User } from '../user/entities/user.entity';
import { UserDTO } from '../user/dto/user-dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private repo: Repository<Team>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(
    createTeamDto: CreateTeamDto,
    req: RefreshRequest,
  ): Promise<TeamDTO> {
    const { accessToken } = req.cookies;

    try {
      const creatorUser: AccessTokenPayload =
        this.jwtService.decode(accessToken);

      const team = this.repo.create({
        ...createTeamDto,
        ownerId: creatorUser.id,
      });

      const dbTeam = await this.repo.save(team);

      return plainToInstance(TeamDTO, dbTeam);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on team creation',
      );
    }
  }

  async findAll() {
    try {
      const teams = await this.repo.find();

      return teams.map((team) => {
        return plainToInstance(TeamDTO, team);
      });
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException('Failed to retrieve teams');
    }
  }

  async findById(id: string): Promise<TeamDTO> {
    try {
      const teamFound = await this.repo.findOne({ where: { id } });

      if (!teamFound) {
        throw new NotFoundException('Team not found');
      }

      return plainToInstance(TeamDTO, teamFound);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on finding team by id',
      );
    }
  }

  async findTeams<K extends keyof Team>(prop: K, value: Team[K]) {
    try {
      const teamFound = await this.repo.find({ where: { [prop]: value } });

      if (!teamFound) {
        throw new NotFoundException('Team searched was not found');
      }

      return plainToInstance(TeamDTO, teamFound);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on finding one team',
      );
    }
  }

  async findTeamMembers(id: string): Promise<UserDTO[]> {
    try {
      const teamFound = await this.repo.findOne({
        where: { id },
        relations: ['teamMembers'],
      });

      if (!teamFound) {
        throw new NotFoundException('Team searched was not found');
      }

      const members = await Promise.all(
        teamFound.teamMembers.map(async (member) => {
          return await this.userRepo.findOne({
            where: { id: member.userId },
            relations: ['teamMemberships'],
          });
        }),
      );

      const membersDTO = members
        .filter((member): member is User => member !== null)
        .map((member) => {
          if (member.teamMemberships) {
            member.teamMemberships = member.teamMemberships.filter(
              (membership) => membership.teamId === id,
            );
          }

          return plainToInstance(UserDTO, member);
        });

      return membersDTO;
    } catch (error: unknown) {
      console.log(error);
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on finding one team',
      );
    }
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<TeamDTO> {
    try {
      const teamToUpdate = await this.repo.findOne({
        where: { id },
      });

      if (!teamToUpdate) {
        throw new NotFoundException('Team searched was not found');
      }

      teamToUpdate.name = updateTeamDto.name as string;
      teamToUpdate.description = updateTeamDto.description as string;

      const updatedTeam = await this.repo.save(teamToUpdate);

      return plainToInstance(TeamDTO, updatedTeam);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException('Failed to update team');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const teamFound = await this.repo.findOne({ where: { id } });

      if (!teamFound) {
        throw new NotFoundException('Team to remove was not found');
      }

      await this.repo.delete(teamFound);
    } catch (error: unknown) {
      treatKnownErrors(error);

      throw new InternalServerErrorException(
        'Unexpected error on team removal',
      );
    }
  }
}
