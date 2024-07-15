import joi from "joi";

export const achievementSchema= joi.object({
        award:joi.string() ,
        description:joi.string(),
        image:joi.string().uri.optional(),
        location: joi.string(),
        date: joi.date(),
        nameOfInstitution: joi.string().required(),
        user: joi.string().required()
        // user: {type: Types.ObjectId, ref: 'User'}
})