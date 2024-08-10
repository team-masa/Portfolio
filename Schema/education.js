import joi from "joi";

export const educationSchema= joi.object({
        schoolName: joi.string().required(),
        location: joi.string(),
        program: joi.string(),
        qualification: joi.string().optional(),
        grade: joi.string(),
        startDate: joi.date().required(),
        endDate: joi.date(),
        user: joi.string()
        // user: {type: Types.ObjectId, ref: 'User'}
})