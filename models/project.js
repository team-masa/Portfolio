import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
//Basic Scheme For Signup & Login
const projectSchema = new Schema([
    {
        projectName: {type: String},
        description: {type: String},
        contributors:{type: String},
        skills:{type: String},
        link:{type: String},
        nameOfInstitution: {type: String},
        startDate: {type: String},
        endDate: {type: String},
        user: {type: Types.ObjectId, ref: 'User'}
    }
],{
    timestamps:true
})

      projectSchema.plugin(toJSON)
export const ProjectModel = model('Project', projectSchema)