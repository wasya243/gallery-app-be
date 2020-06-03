import express from 'express';

import { signUp, signIn } from './handlers';
import { signInUserSchema, signUpUserSchema } from '../../validation-schemas/gallery-user';
import { validate as createValidationMiddleWare } from '../../utils/middlewares/joi-validation';

export const router = express.Router();

router.post('/auth/sign-up', createValidationMiddleWare(signUpUserSchema), signUp);

router.post('/auth/sign-in', createValidationMiddleWare(signInUserSchema), signIn);

// TODO: implement log out functionality in the future
