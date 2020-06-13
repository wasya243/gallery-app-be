import express from 'express';

import { DatabaseManager } from '../../db/database-manager';
import { Picture } from '../../db/models/Picture';

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

// export async function createPicture(req: express.Request, res: express.Response, next: express.NextFunction) {
//   try {
//
//   } catch (err) {
//
//   }
// }
//
// export async function deletePicture(req: express.Request, res: express.Response, next: express.NextFunction) {
//   try {
//
//   } catch (err) {
//
//   }
// }
