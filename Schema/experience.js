import joi from "joi";

export const experienceSchema= joi.object({
    companyName:joi.string(),
    role: joi.string(),
    responsibility:joi.string(),
    location: joi.string(),
    startDate: joi.string().required(),
    endDate: joi.string().required(),
    // user: {type: Types.ObjectId, ref: 'User'}
})