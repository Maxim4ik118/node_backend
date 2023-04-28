import Joi from "joi";

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

export { addSchema };
