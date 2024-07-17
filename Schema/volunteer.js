import joi from "joi";

export const volunteeringSchema= joi.object ({
    organization: joi.string().required(),
    description:joi.string().optional(),
    skills: joi.string().optional(),
    startDate:joi.date().required(),
    endDate: joi.string(),
    role:joi.string().optional(),
    responsibility:joi.string(),
    location: joi.string(),
    projectName:joi.string(),
    user: joi.string()
    // user: {type: Types.ObjectId, ref: 'User'}
        });