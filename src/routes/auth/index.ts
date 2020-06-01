import express from 'express';

import { signUp } from './handlers';

export const router = express.Router();

// TODO: add joi validation schema
router.post('/auth/sign-up', signUp);
