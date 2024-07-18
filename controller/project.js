// import { UserProfile } from "../models/userProfile.js";
import { projectSchema } from "../Schema/project.js";
import { ProjectModel } from "../models/project.js";
import { UserModel } from "../models/user.js";

export const createUserProject = async (req, res, next) =>{
   try {
     const {error, value} = projectSchema.validate(req.body)
     if(error){
         return res.status(400).send(error.details[0].message)
     }

     const userSessionId = req.session?.user?.id || req?.user?.id;

     //after, find the user with the id that you passed when creating project
     const user = await UserModel.findById(userSessionId);
     if(!user){
        return res.status(404).send('User not found')
     }

     const project = await ProjectModel.create({...value, user: userSessionId});
     
     //if you find the user, push the project id you just created inside
     user.projects.push(project._id);

     //and save the user now with the project
      user.save

     //return the project
     res.status(201).json({project,  message: 'Created Successfully'})
   } catch (error) {
    next(error);
   }
}

export const getAllUserProjects = async (req, res) =>{
   try {
      //we are fetching Project that belongs to a particular user
      const userSessionId = req.session?.user?.id || req?.user?.id;

      const allProject = await ProjectModel.find({user: userSessionId});
      // if (allProject.length == 0){
      //    return res.status(200).send({Projects:allProject});
      // }

      res.status(200).json({Projects:allProject})
   } catch (error) {
      return res.status(500).json({error})
   }
}


export const getOneProject = async (req, res) =>{

   const project = await ProjectModel.findById(req.params.id)
   res.status(200).json(project)
 }


export const updateUserProject = async (req, res) =>{
   try {
      const {error, value} = projectSchema.validate(req.body);

      if(error){
         return res.status(400).send(error.details[0].message);
      }

      const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(userSessionId);
      if(!user){
         return res.status(404).send("User not found");
      }

      const project = await ProjectModel.findByIdAndUpdate(req.params.id, value, {new: true});
      if(!project){
         return res.status(404).send({ project,  message: 'Updated Successfully'});
      }

      res.status(200).json({project});
   } catch (error) {
      return res.status(500).json({error})
   }
}

export const deleteUserProject = async (req, res) =>{
   try {
      
      const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(userSessionId);
      if(!user){
         return res.status(404).send("User not found");
      }

      const project = await ProjectModel.findByIdAndDelete(req.params.id);
      if(!project){
         return res.status(404).send("Project not found");
      }
      user.projects.pull(req.params.id);
      await user.save();
      res.status(200).json({project,  message: 'Deleted Successfully'});
   } catch (error) {
      return res.status(500).json({error})
   }
}