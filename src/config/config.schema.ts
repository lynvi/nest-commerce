import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  REFRESH_COOKIE: Joi.string().optional(),
  COOKIES_SECRET: Joi.string().required(),
});
