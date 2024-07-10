import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


//Basic Scheme For Signup & Login
const educationSchema = new Schema([
    {
        schoolName: { type: String },
        location: { type: String },
        program: { type: String },
        qualification: { type: String },
        grade: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        user: {type: Types.ObjectId, ref: 'User'}
    }
]);


educationSchema.plugin(toJSON)
export const User = model('Education', educationSchema)