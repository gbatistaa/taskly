import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isSQLite } from './db/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { TeamMemberModule } from './modules/team-member/team-member.module';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';

console.log(isSQLite);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        if (isSQLite) {
          console.log('🏠 Usando SQLite (modo tablet)');
          return {
            type: 'sqlite',
            database: path.join(
              __dirname,
              '..',
              'src',
              'db',
              process.env.DATABASE || 'taskly.db',
            ),
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
          };
        }

        console.log('🐘 Usando PostgreSQL (modo computador)');
        return {
          type: 'postgres',
          host: process.env.HOST ?? 'localhost',
          port: parseInt(process.env.DB_PORT ?? '5432', 10),
          username: process.env.USERNAME ?? 'postgres',
          password: String(process.env.PASSWORD ?? ''),
          database: process.env.DATABASE ?? 'taskly',
          migrations: [__dirname + '/../migrations/*.{js,ts}'],
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          logger: 'file',
        };
      },
    }),

    AuthModule,
    UserModule,
    RefreshTokenModule,
    TeamModule,
    TeamMemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
