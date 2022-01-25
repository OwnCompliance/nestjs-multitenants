import { SnakeNamingStrategy } from './snake-naming.strategy';

import { join } from 'path';

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',   // Your Account's Username
  password: 'root',   // Your Account's Password
  database: 'nestjs-multi-tenant', // Your "Public" database, this is where all shared data is stored
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  autoLoadEntities: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};