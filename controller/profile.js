import { ProfileModel } from "../models/profile.js";
import { profileSchema } from "../schema/profile.js";

// Validation is needed when creating and updating

export const postProfile = async(req, res, next) => {
    try {
        const {error, value} = profileSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
        // const addProfile = await ProfileModel.create({
        //     ...req.body,
        //     profilePicture:req.file.filename });
        // res.status(200).send(addProfile);
    } catch (error) {
        next(error)
    }
}
    



