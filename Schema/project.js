import joi from "joi";

export const projectSchema= joi.object({
    projectName: joi.string(),
        description:joi.string(),
        contributors:joi.string(),
        skills:joi.string(),
        link:joi.string(),
        nameOfInstitution: joi.string(),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        // user: {type: Types.ObjectId, ref: 'User'}
})