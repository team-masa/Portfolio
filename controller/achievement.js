import { UserModel } from "../models/user.js";
import { AchievementModel } from "../models/achievement.js";
import { achievementSchema } from "../Schema/achievement.js";

export const createAchievement = async(req, res) =>{

try {
    
              const {error, value} = achievementSchema.validate({
                ...req.body,
                award: req.files.award[0].filename,
                image: req.files.image[0].filename,
            });
    
              if(error){
                  return res.status(400).send(error.details[0].message)
              }
    
            // Creating User Session///find the user with the id passed when creating the achievement
              const userSessionId = req.session.user.id;
       
              const user = await UserModel.findById(userSessionId);
              if (!user) {
                return res.status(404).send("User not found");
              }
    
           //create achievement with the value
              const achievement = await AchievementModel.create({
                ...value, user: userSessionId});
    
        
               //if user is found, push achievement id created inside
                 user.achievements.push(achievement._id)
    

              //and save the user now with the achievementId
              await user.save();
       
           //return the achievement
               res.status(201).json(achievement)
} catch (error) {
    console.log(error);

}
   };
   
   
   export const updatetAchievement = async(req, res, next) => {
       try {
           const {error, value} = achievementSchema.validate({  
            ...req.body,
            award: req.files.award[0].filename,
            image: req.files.image[0].filename,})

          if(error){
              return res.status(400).send(error.details[0].message);
          }
          const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const achievement = await AchievementModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }
  
      res.status(200).json({ achievement });
    } catch (error) {
      return res.status(500).json({error})
    }
   };
   
   
   
   export const getAllUserAchievement = async (req, res) => {
    try {
      //we are fetching Achievement that belongs to a particular user
      const userSessionId = req.session.user.id
      const allAchievement = await AchievementModel.find({ user: userSessionId });
      if (allAchievement.length == 0) {
        return res.status(404).send("No Achievement added");
      }
      res.status(200).json({ Achievements: allAchievement });
    } catch (error) {
      return res.status(500).json({error})
    }
  };
   
  export const deleteUserAchievement = async (req, res) => {
    try {
     
  
      const userSessionId = req.session.user.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const achievement = await AchievementModel.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }
  
        user.achievements.pull(req.params.id);
        await user.save();

      res.status(200).json("Achievement deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  