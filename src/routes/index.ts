import express from 'express';

import { router as authRoutes } from './auth';
import { router as pictureRoutes } from './pictures';

export const appRoutes = express.Router();

// I did not find rules for prettier to allow function multiline chains
// prettier-ignore
appRoutes
  .use(pictureRoutes)
  .use(authRoutes);
