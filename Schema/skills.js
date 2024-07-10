import joi from "joi";

export const skillSchema= joi.object({
    
        name:joi.string(),
           levelOfProficiency: joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        //    user: {type: Types.ObjectId, ref: 'User'}
})