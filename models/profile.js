import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const profileSchema = new Schema({
    profilePicture: {type: String},
    location: {type: String},
    maritalStatus: {type: String, enum:['Single','married', 'prefer-not-to-say']},
    sex: {type: String, enum:['Male', 'Female']},
    bio: {type: String},
    about: {type: String},
    dateOfBirth: {type: Date},
    contact: {type: String},
    resume: {type: String},
    githubLink:{type: String},
    linkedinLink:{type: String},
    twitterLink:{type: String},
    user: {type: Types.ObjectId, ref: 'User'}
},{
    timestamps:true
});


profileSchema.plugin(toJSON)
export const User = model('Profile', profileSchema)