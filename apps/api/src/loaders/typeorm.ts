import { DataSource } from 'typeorm';
import { db } from '../config';
import { Logger } from './logger';
// import { environment } from '../environments/environment';
import Project from '../features/projects/project.entity';
import User from '../features/users/user.entity';

const entities = [Project, User];

export default async () => {
  const dbVars = db();

  // const prodOptions = environment.production
  // eslint-disable-next-line no-constant-condition
  const prodOptions = false
    ? {
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {};

  const dataSource = new DataSource({
    type: 'postgres',
    host: dbVars.host,
    port: dbVars.port,
    username: dbVars.username,
    password: dbVars.password,
    database: dbVars.database,
    synchronize: true,
    entities,
    ...prodOptions,
  });

  try {
    await dataSource.initialize();
    Logger.info('Connected to database');
  } catch (error) {
    Logger.error(error);
    throw new Error('Unable to connect to database');
  }
};
