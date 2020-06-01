import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Connection } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { DatabaseManager } from './db/database-manager';

const app = express();

const { SERVER_PORT } = process.env;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const connectionPromise = DatabaseManager.connect();

if (connectionPromise) {
  connectionPromise.then((connection: Connection) => {
    try {
      DatabaseManager.setConnection(connection);

      console.log(`Connection with database is established`);

      app.listen(SERVER_PORT, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        } else {
          console.log(`Server is listening on ${SERVER_PORT}`);
        }
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
}
