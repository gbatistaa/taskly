import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './modules/user/dto/user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async start(): Promise<UserDTO[]> {
    return await this.appService.createUsersMock();
  }
}
