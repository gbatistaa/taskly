import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
