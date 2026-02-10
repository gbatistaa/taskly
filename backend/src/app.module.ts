import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { TeamMemberModule } from './modules/team-member/team-member.module';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';
import { TaskColumnModule } from './modules/task-column/task-column.module';
import { TaskModule } from './modules/task/task.module';
import { AppDataSource } from './data/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'advanced-console',
      }),
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    }),

    AuthModule,
    UserModule,
    RefreshTokenModule,
    TeamModule,
    TeamMemberModule,
    TaskColumnModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
