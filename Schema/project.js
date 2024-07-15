import joi from "joi";

export const projectSchema= joi.object({
        projectName: joi.string().required(),
        description:joi.string().required(),
        contributors:joi.string(),
        skills:joi.string().required(),
        link:joi.string().uri(),
        nameOfInstitution: joi.string().required(),
        startDate: joi.date().required(),
        endDate: joi.string().required(),
        user: joi.string().required()
        // user: {type: Types.ObjectId, ref: 'User'}
})