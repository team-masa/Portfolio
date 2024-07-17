// import { UserProfile } from "../models/userProfile.js";
import { UserModel } from "../models/user.js";
import { ExperienceModel } from "../models/experience.js";
import { experienceSchema } from "../Schema/experience.js";
// import { userProfileSchema } from "../Schema/userProfile.js";



export const createExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id;
     
  
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const addExperience = await ExperienceModel.create({ ...value, user: userSessionId });
  
      user.experiences.push(addExperience._id)
  
      await user.save();
  
      res.status(201).json({ addExperience });
    } catch (error) {
      console.log(error);
    }
  };
   
   
  export const updateExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const changeExperience = await ExperienceModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!changeExperience) {
            return res.status(404).send("experience not found");
        }
  
      res.status(200).json({ changeExperience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };
   
   
   
   export const getAllUserExperience = async (req, res, next) => {
   
       try {
           //we are fetching experience that belongs to a particular user
           const userSessionId = req.session?.user?.id || req?.user?.id;
           const allExperience = await ExperienceModel.find({user: userSessionId});

       if(allExperience.length == 0){
           return res.status(404).send('No experience added')
       }
       res.status(200).json({experience:allExperience})
       } catch (error) {
         next(error)  
       }
   }
   
   export const deleteExperience = async (req, res) => {
    try {
     
  
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experiences.pull(req.params.id);
        await user.save();
      res.status(200).json("Experience deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  