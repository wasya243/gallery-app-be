import * as express from 'express';
import { STATUS_CODES } from 'http';

import { composeJoiValidationError } from '../helpers';

export function errorHandlerMiddleware(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  let response = {
    code: error.status,
    message: error.message || STATUS_CODES[error.status]
  };

  if (error.joiValidation) {
    response = Object.assign(response, { data: composeJoiValidationError(error.data.details) });
  }
  res.status(error.status).send(response);
}
