import Joi from "joi";

export const fileUploadSchema = Joi.object({
  s3Url: Joi.string().uri().required().messages({
    "string.base": "s3Url must be a string",
    "string.uri": "s3Url must be a valid URL",
    "any.required": "s3Url is required",
  }),
  chatId: Joi.string().required().messages({
    "any.required": "chatId is required",
  }),
  fileDescription: Joi.string().optional(),
  userKey1: Joi.string().optional(),
});