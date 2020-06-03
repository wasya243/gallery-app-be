import express from 'express';

import { signUp, signIn } from './handlers';

export const router = express.Router();

// TODO: add joi validation schema
router.post('/auth/sign-up', signUp);

// TODO: add joi validation schema
router.post('/auth/sign-in', signIn);
