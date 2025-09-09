import { DataSource } from 'typeorm';
//import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //entities: [User],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false,
});

