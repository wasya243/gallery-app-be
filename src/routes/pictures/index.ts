import express from 'express';

import { authMiddleware } from '../../auth/middlewares/auth';
import { getGalleryUserPictures, deletePicture, createPicture } from './handlers';
import { validate as createValidationMiddleWare } from '../../utils/middlewares/joi-validation';
import { createPictureSchema } from '../../validation-schemas/picture';

export const router = express.Router();

router.get('/user-pictures', authMiddleware, getGalleryUserPictures);

router.delete('/pictures/:id', authMiddleware, deletePicture);

router.post('/pictures', authMiddleware, createValidationMiddleWare(createPictureSchema), createPicture);
