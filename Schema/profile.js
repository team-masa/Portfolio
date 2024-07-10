import joi from "joi";

export const profileSchema= joi.object({
    profilePicture:joi.string(),
    location:joi.string(),
    maritalStatus: joi.string().valid('Single','married', 'prefer-not-to-say'),
    sex: joi.string().valid('Male', 'Female'),
    bio: joi.string(),
    about: joi.string(),
    dateOfBirth: joi.string(),
    contact: joi.string(),
    resume: joi.string(),
    githubLink:joi.string(),
    linkedinLink:joi.string(),
    twitterLink:joi.string(),
    // user: {type: Types.ObjectId, ref: 'User'}
})