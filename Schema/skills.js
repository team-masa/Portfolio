import joi from "joi";

export const skillsSchema= joi.object({
    
        name:joi.string(),
           levelOfProficiency: joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Expert'),
        //    user: {type: Types.ObjectId, ref: 'User'}
})