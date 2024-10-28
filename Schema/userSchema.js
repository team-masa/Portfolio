import joi from "joi";

export const userSchema = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    otherNames: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().min(4)
    .pattern(/[0-9]/)
    .message("Password must be at least 4 characters long and include at least one number.")
    .required(),
    confirmPassword: joi.ref("password"),
    userName: joi.string().required(),
    termsAndConditions: joi.boolean(),
  })
  .with("password", "confirmPassword");

  export const passwordSchema = joi.object({
    password: joi.string()
    .min(4)
    .pattern(/[0-9]/)
    .message("Password must be at least 4 characters long and include at least one number."),
    confirmPassword: joi.ref("password"),
  })