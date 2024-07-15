import { UserProfile } from "../models/userProfile.js";
import { volunteerSchema } from "../schema/volunteer.js";
import { UserModel } from "../models/user.js";
import { ProjectModel } from "../models/project.js";
import { VolunteerModel } from "../models/volunteer.js";

export const createUserVolunteering = async (req, res) =>{
   try {
     const {error, value} = volunteerSchema.validate(req.body)
     if(error){
         return res.status(400).send(error.details[0].message)
     }

     const userSessionId = req.session.user.id;


     //after, find the user with the id that you passed when creating the volunteer
     const user = await UserModel.findById(userSessionId);
     if(!user){
      return res.status(404).send('User not found');
     }

     const volunteering = await VolunteerModel.create({
      ...value,
      user: userSessionId,
     });

     

     //if you find the user, push the volunteer id you just created inside
     user.volunteering.push(volunteering._id);

     //and save the user now with the volunteerId
     await user.save();

     //return the volunteer
     res.status(201).json({volunteering})

   } catch (error) {
    console.log(error);
   }
}


export const getAllUserVolunteering = async (req, res) =>{
 try {
   //we are fetching volunteer that belongs to a particular user
   const userSessionId = req.session.user.id
   const allvolunteering = await VolunteerModel.find({user: userSessionId})
   if(allvolunteer.length == 0){
     return res.status(404).send('No volunteering added')
   }
   res.status(200).json({Volunteering: allvolunteering})
 } catch (error) {
    return res.status(500).json({error})
 }
}

export const updateUserVolunteering = async (req, res) =>{
  try {
    const {error, value} = volunteerSchema.validate(req.body);

    if(error){
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if(!user){
      return res.status(404).send("User not found");
    }

    const volunteering = await VolunteerModel.findByIdAndUpdate(
      req.params.id,
      value,
      {new: true}
    );
    if(!volunteering){
      return res.status(404).send("Volunteering not found");
    }

    res.status(200).json({Volunteering})
  } catch (error) {
    return res.status(500).json({error})
  }
}


export const deleteUserVolunteering = async (req, res) =>{
  try {
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if(!user){
      return res.status(404).send("User not found");
    }

    const volunteering = await VolunteerModel.findByIdAndDelete(req.params.id);
    if(!volunteering){
      return res.status(404).send("Volunteering not found");
    }

    user.volunteering.pull(req.params.id);
    await user.save();

    res.status(200).json("Volunteering deleted");
  } catch (error) {
    return res.status(500).json({error});
  }
}

export const getOneVolunteer = async (req, res) =>{

  const volunteer = await VolunteerModel.findById(req.params.id)
  res.status(200).json(volunteer)
}