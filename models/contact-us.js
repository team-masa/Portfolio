import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { required } from "joi";


const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    message: { type: String, required },
    user: { type: Types.ObjectId, ref: "User", select: false },

},
    {
        timestamps: true,
    });

contactSchema.plugin(toJSON);

export const ContactModel = model("Contact", contactSchema);
































-