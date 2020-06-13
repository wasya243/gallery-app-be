import * as Joi from 'joi';

// TODO: add file field
export const createPictureSchema = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required()
  }
};
