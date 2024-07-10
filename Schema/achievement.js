import joi from "joi";

export const userSchema= joi.object({
    award:joi.string() ,
        description:joi.string(),
        image:joi.string().uri.optional(),
        location: joi.string(),
        date: joi.string(),
        nameOfInstitution: joi.string(),
        // user: {type: Types.ObjectId, ref: 'User'}
})