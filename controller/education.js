import { EducationModel } from "../models/education.js";
import { UserModel } from "../models/user.js";
import { educationSchema } from "../Schema/education.js";


export const createEducation = async(req, res) =>{

 try {
       const {error, value} = educationSchema.validate(req.body)
       if(error){
           return res.status(400).send(error.details[0].message)
       }
  //after, find the user with the id that you passed when creating the education
  // console.log('userId',req.session.user.id)

    //find the user with the id passed when creating the education

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userSessionId)
    if (!user) {
      return res.status(404).send('User not found');
    }

    //create education with the value
    const addEducation = await EducationModel.create({...value, user:userSessionId})
        //if user is found, push education id created inside
      user.education.push(addEducation._id);
       //and save the user now with the educationId
       await user.save();

    //return the education
        res.status(201).json({addEducation});

 } catch (error) {
    return res.status(500).send(error)
 }
};


export const updateEducation = async(req, res, next) => {
    try {
        const {error, value} = educationSchema.validate(req.body)
       if(error){
           return res.status(404).send(error.details[0].message)
       }
       console.log('value', value)

       const userSessionId = req.session?.user?.id || req?.user?.id; 
       const user = await UserModel.findById(userSessionId);
       if (!user) {
         return res.status(404).send("User not found");
       }
   
       const Education = await Education.findByIdAndUpdate(req.params.id, value, { new: true });
         if (!Education) {
             return res.status(404).send("Education not found");
         }
   
       res.status(201).json({ Education });
    } catch (error) {
        next(error);
    }
};



export const getAllUserEducation = async (req, res, next) => {

    try {
        //we are fetching education that belongs to a particular user
         const userSessionId = req.session?.user?.id || req?.user?.id;
    const allEducation = await EducationModel.find({ user: userSessionId });
    if (allEducation.length == 0) {
      return res.status(404).send("No education added");
    }
    res.status(200).json({ education: allEducation });
    } catch (error) {
      next(error)  
    }
}

export const deleteUserEducation = async (req, res) => {
    try {
     
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const education = await EducationModel.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education not found");
        }
  
        user.education.pull(req.params.id);
        await user.save();
      res.status(200).json("Education deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  