import express from 'express';

import { authMiddleware } from '../../auth/middlewares/auth';
import { getGalleryUserPictures } from './handlers';

export const router = express.Router();

router.get('/user-pictures', authMiddleware, getGalleryUserPictures);
