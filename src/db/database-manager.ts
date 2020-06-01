import { createConnection, Connection } from 'typeorm';

import { GalleryUser } from './models';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

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

  public static connect(): Promise<Connection> | undefined {
    if (!DatabaseManager.connection) {
      return createConnection({
        type: 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [GalleryUser],
        synchronize: true,
        logging: false
      });
    }
  }
}
