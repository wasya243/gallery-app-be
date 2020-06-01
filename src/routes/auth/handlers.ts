import express from 'express';

import { DatabaseManager } from '../../db/database-manager';
import { GalleryUser } from '../../db/models';
import { encryptPassword } from '../../auth/crypt';

export async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { firstName, lastName, password, email } = req.body;

  try {
    const connection = DatabaseManager.getConnection();
    const userRepository = connection.getRepository(GalleryUser);

    const user = await userRepository.findOne({ email });

    if (user) {
      console.error(`user already exists`);
    }

    const userToCreate = new GalleryUser();
    userToCreate.firstName = firstName;
    userToCreate.lastName = lastName;
    userToCreate.email = email;
    userToCreate.password = await encryptPassword(password);

    await userRepository.save(userToCreate);

    // TODO: think of response (do not return password and id --> use projection)
    res.send(userToCreate);
  } catch (error) {
    // TODO: add error handler
    console.error(error);
  }
}
