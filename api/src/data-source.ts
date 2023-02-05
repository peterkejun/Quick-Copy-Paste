import { DataSource } from 'typeorm';

const getDatabasePort = (): number => {
  if (process.env.DB_PORT != null) {
    return parseInt(process.env.DB_PORT);
  }
  return 3306;
};
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: getDatabasePort(),
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'quick-copy-paste',
  synchronize: true,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  subscribers: [],
  migrations: ['migrations/*.ts'],
});
