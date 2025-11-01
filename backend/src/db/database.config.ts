const dbName = process.env.DATABASE ?? '';

export const isSQLite =
  dbName.endsWith('.db') ||
  dbName.includes('sqlite') ||
  process.env.DB_TYPE === 'sqlite';
