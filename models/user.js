import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
//Basic Scheme For Signup & Login
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    userName: { type: String, unique: true },
    termsAndConditions: { type: Boolean },
    userProfile: { type: Types.ObjectId, ref: "UserProfile" },
    education: [{ type: Types.ObjectId, ref: "Education" }],
    skills: [{ type: Types.ObjectId, ref: "Skill" }],
    achievements: [{ type: Types.ObjectId, ref: "Achievement" }],
    projects: [{ type: Types.ObjectId, ref: "Project" }],
    volunteering: [{ type: Types.ObjectId, ref: "Volunteering" }],
    experiences: [{ type: Types.ObjectId, ref: "Experience" }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
export const UserModel = model("User", userSchema);
