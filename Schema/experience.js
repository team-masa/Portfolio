import joi from "joi";

export const userSchema= joi.object({
    companyName:joi.string(),
    role: joi.string(),
    responsibility:joi.string(),
    location: joi.string(),
    startDate: joi.string(),
    endDate: joi.string(),
    // user: {type: Types.ObjectId, ref: 'User'}
})