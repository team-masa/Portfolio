import joi from "joi";
export const skillSchema= joi.object({
           name:joi.string().required(),
           levelOfProficiency: joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Expert'),
           user: joi.string()
        //    user: {type: Types.ObjectId, ref: 'User'}
})