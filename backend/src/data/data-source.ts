import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { isSQLite } from './database.config';

dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

// const isProduction = process.env.NODE_ENV === 'production';

const commonOptions = {
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: true,
  logging: false,
};

const dataSourceOptions: DataSourceOptions = isSQLite
  ? {
      type: 'sqlite',
      database: path.join('.', 'data', process.env.DATABASE || 'taskly.db'),
      ...commonOptions,
    }
  : {
      type: 'postgres',
      host: process.env.HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.PASSWORD ?? '',
      database: process.env.DATABASE ?? 'taskly',
      ssl: {
        rejectUnauthorized: false,
      },
      ...commonOptions,
    };

export const AppDataSource = new DataSource(dataSourceOptions);
