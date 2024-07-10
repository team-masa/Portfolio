import joi from "joi";

export const experienceSchema= joi.object({
    companyName:joi.string().required(),
    role: joi.string().required(),
    responsibility:joi.string().optional(),
    location: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    // user: {type: Types.ObjectId, ref: 'User'}
})