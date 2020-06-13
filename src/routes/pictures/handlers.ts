import express from 'express';

import { DatabaseManager } from '../../db/database-manager';
import { Picture } from '../../db/models/Picture';
import httpErrors from 'http-errors';

export async function getGalleryUserPictures(req: express.Request, res: express.Response, next: express.NextFunction) {
  // TODO: try extending request type
  // @ts-ignore
  const galleryUserId = req.userData.id;
  try {
    const connection = DatabaseManager.getConnection();
    const pictureRepository = connection.getRepository(Picture);

    const pictures = await pictureRepository.find({ where: { galleryUser: galleryUserId } });

    res.send(pictures);
  } catch (err) {
    next(err);
  }
}

export async function createPicture(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { description, title } = req.body;
  // TODO: try extending request type
  // @ts-ignore
  const galleryUserId = req.userData.id;
  try {
    const connection = DatabaseManager.getConnection();
    const pictureRepository = connection.getRepository(Picture);

    const pictureToCreate = new Picture();
    pictureToCreate.galleryUser = galleryUserId;
    pictureToCreate.description = description;
    pictureToCreate.title = title;

    await pictureRepository.save(pictureToCreate);

    res.send(pictureToCreate);
  } catch (err) {
    next(err);
  }
}

export async function deletePicture(req: express.Request, res: express.Response, next: express.NextFunction) {
  // TODO: try extending request type
  // @ts-ignore
  const galleryUserId = req.userData.id;
  const pictureId = parseInt(req.params.id, 10);
  try {
    const connection = DatabaseManager.getConnection();
    const pictureRepository = connection.getRepository(Picture);

    const pictureToDelete = await pictureRepository.findOne(pictureId);

    if (!pictureToDelete) {
      return next(httpErrors(404, `Picture with given id ${pictureId} is not found`));
    }

    if (pictureToDelete && pictureToDelete.galleryUser.id !== galleryUserId) {
      return next(httpErrors(400, `Picture with given id ${pictureId} is not found does not belong to user with id ${galleryUserId}`));
    }

    await pictureRepository.remove(pictureToDelete);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
