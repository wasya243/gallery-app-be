import express from 'express';
import httpErrors from 'http-errors';

import { DatabaseManager } from '../../db/database-manager';
import { GalleryUser } from '../../db/models';
import { encryptPassword, verifyPassword } from '../../auth/crypt';
import { sign } from '../../auth/token';

export async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { password, email } = req.body;

  try {
    const connection = DatabaseManager.getConnection();
    const galleryUserRepository = connection.getRepository(GalleryUser);

    const galleryUser = await galleryUserRepository.findOne({ email });

    if (!galleryUser || !(await verifyPassword(password, galleryUser.password))) {
      // TODO: add logging in the future
      console.error(`user not found or invalid password`);
      return next(httpErrors(401, 'gallery user not found or invalid password'));
    }

    const galleryUserPayload = { id: galleryUser.id };
    const accessToken = await sign(galleryUserPayload);
    const response = {
      accessToken,
      galleryUser: {
        email: galleryUser.email,
        firstName: galleryUser.firstName,
        lastName: galleryUser.lastName
      }
    };

    res.send(response);
  } catch (error) {
    // TODO: add logging in the future
    console.error(error);
    next(error);
  }
}

export async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { firstName, lastName, password, email } = req.body;

  try {
    const connection = DatabaseManager.getConnection();
    const galleryUserRepository = connection.getRepository(GalleryUser);

    const user = await galleryUserRepository.findOne({ email });

    if (user) {
      // TODO: add logging in the future
      console.error(`user with email ${email} already exists`);
      return next(httpErrors(400, `user with email ${email} already exists`));
    }

    const galleryUserToCreate = new GalleryUser();
    galleryUserToCreate.firstName = firstName;
    galleryUserToCreate.lastName = lastName;
    galleryUserToCreate.email = email;
    galleryUserToCreate.password = await encryptPassword(password);

    await galleryUserRepository.save(galleryUserToCreate);

    const response = {
      firstName: galleryUserToCreate.firstName,
      lastName: galleryUserToCreate.lastName,
      email: galleryUserToCreate.email
    };

    res.send(response);
  } catch (error) {
    // TODO: add logging in the future
    console.error(error);
    next(error);
  }
}
