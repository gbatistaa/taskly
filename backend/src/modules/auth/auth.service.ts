import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginRequestBodyDTO } from './dto/login-reqbody-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDto: LoginRequestBodyDTO): Promise<string> {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findOneByEmail(email, true);

      if (!user) {
        throw new NotFoundException();
      }

      if (user.password !== password) {
        throw new BadRequestException();
      }

      return 'accessToken';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
