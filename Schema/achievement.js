import joi from "joi";

export const achievementSchema= joi.object({
        award:joi.string() ,
        description:joi.string(),
        image:joi.string(),
        location: joi.string(),
        date: joi.date(),
        nameOfInstitution: joi.string().required(),
        user: joi.string()
        // user: {type: Types.ObjectId, ref: 'User'}
})