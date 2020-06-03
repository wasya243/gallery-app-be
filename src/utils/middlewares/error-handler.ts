import * as express from 'express';

export function errorHandlerMiddleware(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(error.status).send(error);
}
