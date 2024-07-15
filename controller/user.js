import { UserModel } from '../models/user.js'
import { userSchema } from '../Schema/userSchema.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) =>{

    try {
      const {error, value} = userSchema.validate(req.body)
      if(error){
          return res.status(400).send(error.details[0].message)
      }
  
      const email = value.email
  
      const findIfUserExist = await UserModel.findOne({email})
      if(findIfUserExist){
          return res.status(401).send('User has already signedup')
      }else{
          const hashedPassword = await bcrypt.hash(value.password, 6);
          value.password = hashedPassword;
  
          const addUser = await UserModel.create(value);
  
          req.session.user = {id: addUser.id};
          return res.status(201).json({'message': "Registration successful"});
          }
    } catch (error) {
      console.log(error.message)
    }

}



// Login user
export const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await UserModel.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    }else {
        const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).json("Invalid login details");
    }
    // Generate a session for the user
    req.session.user = { id: user.id };

    res.status(201).json("Login successful");
    }
    // Verify user password
    
  } catch (error) {
    console.log(error)
    next(error);
  }
};




export const getUser = async (req, res, next) => {
try {
      
      const userName = req.params.userName.toLowerCase(); 
      //get user based on the user id
      //use the select to exclude the password
      //use populate to populate the education
      const options = { sort: { startDate: -1 } }

      const userDetails = await UserModel.findOne({userName})
        .populate({
          path:"education",
          options,
        })
        .populate("userProfile")
        .populate("skills")
        
        .populate({
          path: "achievements",
          options: {sort: {date: -1}},
        })
        .populate({
          path: "experiences",
          options,
        })
        .populate({
          path: "volunteering",
          options,
        })
        .populate({
          path: "projects",
          options,
        })
      return res.status(202).json({user: userDetails})
} catch (error) {
  next(error)
}
};



export const getUsers = async (req, res) =>{

  const email = req.query.email?.toLowerCase();
  const userName = req.query.userName?.toLowerCase();

  const filter = {};
  if(email){
    filter.email = email;
  }
  if(userName){
    filter.userName = userName;
  }

  const users = await UserModel.find(filter);

  return res.status(200).json({users})
};

export const logout = async (req, res, next) =>{
    try {
      //Destroy User Session
      req.session.destroy();
      //Return response
      res.status(200).json('User Logged out successfully')
    } catch (error) {
      next(error)
    }
  }
  
