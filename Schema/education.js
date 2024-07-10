import joi from "joi";

export const userSchema= joi.object({
    schoolName: joi.string(),
        location: joi.string(),
        program: joi.string(),
        qualification: joi.string(),
        grade: joi.string(),
        startDate: joi.string(),
        endDate: joi.string(),
        // user: {type: Types.ObjectId, ref: 'User'}
})