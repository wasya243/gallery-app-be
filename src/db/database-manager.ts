import { createConnection, Connection } from 'typeorm';

import { User } from './models';

// TODO: move into env variables
const USER = '';
const HOST = '';
const DATABASE = '';
const PASSWORD = '';
const DB_PORT = 1;

export class DatabaseManager {
  private static connection: Connection;

  public static setConnection(connection: Connection): void {
    if (!DatabaseManager.connection) {
      DatabaseManager.connection = connection;
    }
  }

  public static getConnection(): Connection {
    if (!DatabaseManager.connection) {
      throw new Error('Connection to the database has not been established');
    }

    return DatabaseManager.connection;
  }

  public static connect(): Promise<Connection> {
    if (!DatabaseManager.connection) {
      return createConnection({
        type: 'postgres',
        host: HOST,
        port: DB_PORT,
        username: USER,
        password: PASSWORD,
        database: DATABASE,
        entities: [User],
        synchronize: true,
        logging: false
      });
    }
  }
}
