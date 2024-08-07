import { UserProfile } from "../models/userProfile.js";
import { userProfileSchema } from "../Schema/userProfile.js";
import { UserModel } from "../models/user.js";

export const createProfile = async (req, res, next) => {
    try {
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files?.profilePicture[0].filename,
            resume: req?.files?.resume[0].filename,
        });
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session?.user?.id || req?.user.id;

        const user = await UserModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const profile = await UserProfile.create({ ...value, user: userSessionId });

        user.userProfile = profile.id

        //and save the user now with the userId
        await user.save()

        res.status(201).json({ profile, message: 'Created Successfully' });

    } catch (error) {
        next(error)
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const updateFields = {...req.body};
        if (req?.file?.profilePicture){
            updateFields.profilePicture = req?.file?.filename;
        } else if (req.files?.profilePicture) {
            updateFields.profilePicture = req.files.profilePicture[0].filename;
        };

        if (req.file?.resume) {
         updateFields.resume = req?.file?.filename;
         } else if (req?.files?.resume) {
            updateFields.resume = req?.files?.resume[0].filename;
        }

        const { error, value } = userProfileSchema.validate(updateFields);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const profile = await UserProfile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
        res.status(201).json({ profile, message: 'Updated Successfully' })
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        //Get user id from session or request
        const userSessionId = req.session?.user?.id || req?.user.id
        const profile = await UserProfile.findOne({ user: userSessionId }).populate({
            path: 'user',
            select: '-password'
        });

        if (!profile) {
            const user = await UserModel.findById(userSessionId).select({ firstName: true, lastName: true});
            return res.status(200).send({ profile: user });
        }
        res.status(200).json({ profile })
    } catch (error) {
        next(error)
    }
}