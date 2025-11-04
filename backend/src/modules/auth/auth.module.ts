import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordValidationMiddleware } from './middlewares/password-validation/password-validation.middleware';
import { TokenValidationMiddleware } from './middlewares/token-validation/token-validation.middleware';
import { UserExistenceMiddleware } from './middlewares/user-existence/user-existence.middleware';

@Module({
  imports: [
    UserModule,
    RefreshTokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserExistenceMiddleware, PasswordValidationMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST })
      .apply(TokenValidationMiddleware)
      .exclude({ path: 'auth/*path', method: RequestMethod.POST })
      .exclude({ path: 'user/*path', method: RequestMethod.POST })
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
