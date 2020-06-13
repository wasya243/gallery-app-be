import * as express from 'express';

import * as token from '../token';
import { GalleryUser } from '../../db/models';
import { DatabaseManager } from '../../db/database-manager';
import httpErrors from 'http-errors';

export async function authMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
  const authHeader = request.header('Authorization');

  if (!authHeader) {
    return next({ status: 401 });
  }

  const [, accessToken = ''] = /Bearer (.+)/.exec(authHeader) || [];

  try {
    const connection = DatabaseManager.getConnection();
    const galleryUserRepository = connection.getRepository(GalleryUser);

    const encoded = await token.verify(accessToken);
    const galleryUser = await galleryUserRepository.findOne(parseInt(encoded.id, 10));

    if (!galleryUser) {
      return next(httpErrors(401, 'gallery user not found or invalid password'));
    }

    // TODO: try extending request type
    // @ts-ignore
    request.userData = { id: galleryUser.id };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(httpErrors(401, error.message));
    }
    next(error);
  }
}
