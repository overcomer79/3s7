import * as joi from "joi";
import { Response, NextFunction } from "express";

export const validateBody = schema => {
  return (req: any, res: Response, next: NextFunction) => {
    const result: joi.ValidationResult<any> = joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }
    // req.value.body instead of req.body
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = result.value;
    next();
  };
};

export const schemas = {
  oauthSchema: joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  })
};
