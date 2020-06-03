import * as Joi from 'joi';

export const signUpUserSchema = {
  body: {
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required()
  }
};

export const signInUserSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
};
