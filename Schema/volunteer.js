import joi from "joi";

export const userSchema= joi.object ({
    organization: joi.string(),
    description:joi.string(),
    skills: joi.string(),
    startDate:joi.string().required(),
    endDate: joi.string().required(),
    role:joi.string(),
    responsibility:joi.string(),
    location: joi.string(),
    projectName:joi.string(),
    // user: {type: Types.ObjectId, ref: 'User'}
        });