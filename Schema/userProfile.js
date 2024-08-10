import joi from "joi";

export const userProfileSchema = joi.object({
  profilePicture: joi.string(),
  location: joi.string(),
  maritalStatus: joi.string().valid("single", "married", "prefer-not-to-say"),
  sex: joi.string().valid("male", "female"),
  bio: joi.string(),
  about: joi.string(),
  dateOfBirth: joi.date(),
  contact: joi.string(),
  resume: joi.string(),
  languages: joi.array().items(joi.string()),
  linkedinLink: joi.string(),
  githubLink: joi.string(),
  twitterLink: joi.string(),
  user: joi.string(),
});
