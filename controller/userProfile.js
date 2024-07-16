import { UserProfile } from "../models/userProfile.js";
import { userProfileSchema } from "../Schema/userProfile.js";
import { UserModel } from "../models/user.js";

export const createProfile = async (req, res, next) =>{
try {
        const {error, value} = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename,
        });
    
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session.user.id;

        const user = await UserModel.findById(userSessionId)
        if(!user){
            return res.status(404).send('User not found')
        }
    
        const profile = await UserProfile.create({...value, user: userSessionId});
    
        user.userProfile = profile._id
    
        //and save the user now with the userId
        await user.save()

        res.status(201).json({profile});
    
} catch (error) {
 next(error)   
}
}

export const updateProfile = async (req, res) =>{
    try {
        const {error, value} = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename,
        });

        if (error){
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;
        const user = await UserModel.findById(userSessionId);
        if (!user){
            return res.status(404).send("User not found");
        }

        const profile = await UserProfile.findByIdAndUpdate(req.params.id, value, {new: true});
        if (!profile){
            return res.status(404).send("Profile not found");
        }
        res.status(201).json({profile})
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = async (req, res) =>{
    try {
        const userSessionId = req.session.user.id
        const profile = await UserProfile.find({user: userSessionId});
        if (!profile){
            return res.status(404).send("No profile added");
        }
        res.status(200).json({profile})
    } catch (error) {
        return res.status(500).json({error})
        
    }
}