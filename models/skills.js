import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const skillsSchema = new Schema({
           name: {type: String},
           levelOfProficiency: {type: String, enum:['Beginner', 'Intermediate', 'Advanced', 'Expert']},
           user: {type: Types.ObjectId, ref: 'User'}
        },{
   timestamps:true
})

   skillsSchema.plugin(toJSON)
  export const SkillsModel = model('Skill', skillsSchema)