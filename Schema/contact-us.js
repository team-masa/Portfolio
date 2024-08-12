import joi from joi

export const contactSchema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    message: joi.string().required(),
    user: joi.string()
});