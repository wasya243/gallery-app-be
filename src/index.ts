import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { Connection } from 'typeorm';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { DatabaseManager } from './db/database-manager';
import { appRoutes } from './routes';
import { errorHandlerMiddleware } from './utils/middlewares/error-handler';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appRoutes);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => next({ status: 404 }));
app.use(errorHandlerMiddleware);

const { SERVER_PORT } = process.env;

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
