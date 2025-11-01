// src/utils/db-types.ts

import { isSQLite } from './database.config';

export const DB_TYPES = {
  text: isSQLite ? 'text' : 'citext',
  uuid: 'uuid',
  enum: (enumObj: object) => (isSQLite ? 'text' : 'enum'),
};
