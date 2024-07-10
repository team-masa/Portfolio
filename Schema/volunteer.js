import joi from "joi";

export const volunteerSchema= joi.object ({
    organization: joi.string().required(),
    description:joi.string().optional(),
    skills: joi.string().optional(),
    startDate:joi.date().required(),
    endDate: joi.string().required(),
    role:joi.string().optional(),
    responsibility:joi.string(),
    location: joi.string().required(),
    projectName:joi.string().required(),
    // user: {type: Types.ObjectId, ref: 'User'}
        });