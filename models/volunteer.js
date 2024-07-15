import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
//Basic Scheme For Signup & Login
const volunteerSchema = new Schema({
        organization: {type: String},
        description: {type: String},
        skills:{type: String},
        startDate: {type: String},
        endDate: {type: String},
        role: {type: String},
        responsibility:{type: String},
        location: {type: String},
        projectName: {type: String},
        user: {type: Types.ObjectId, ref: 'User'}
    },{
    timestamps:true
})

volunteerSchema.plugin(toJSON)
export const VolunteerModel = model('Volunteer', volunteerSchema)