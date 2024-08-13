import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import { userSchema } from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import { UserProfile } from "../models/userProfile.js";

export const signup = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const email = value.email;

    const findIfUserExist = await UserModel.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send("User has already signedup");
    } else {
      const hashedPassword = await bcrypt.hash(value.password, 6);
      value.password = hashedPassword;

      const newUser = await UserModel.create(value);

      // Create an empty UserProfile with the userId
      const userProfile = await UserProfile.create({ user: newUser._id });

      newUser.userProfile = userProfile.id;
      await newUser.save();
      console.log(newUser);

      // req.session.user = {id: addUser.id};

      return res.status(201).json({ message: "Registration successful" });
    }
  } catch (error) {
    next(error);
  }
};

// Login Token
export const token = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    // Find user using their email/ username Validate request
    const user = await UserModel.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
      //verify password
      const correctPass = bcrypt.compareSync(password, user.password);
      if (!correctPass) {
        return res.status(401).json("Invalid login details");
      }
      // Create a token
      const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "72h",
      });
      // Return response
      res.status(200).json({
        message: "User logged in",
        accessToken: token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //  Find a user using their email or username
    const user = await UserModel.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
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
    console.log(error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userName = req.params.userName
    //get user based on the user id
    //use the select to exclude the password
    //use populate to populate the education
    const options = { sort: { startDate: -1 } };

    const userDetails = await UserModel.findOne({ userName })
      .select("-password")
      .populate({
        path: "education",
        options,
      })
      .populate("userProfile")
      .populate("skills")

      .populate({
        path: "achievements",
        options: { sort: { date: -1 } },
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
      });
    console.log(userDetails);
    return res.status(202).json({ user: userDetails });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  const email = req.query.email?.toLowerCase();
  const userName = req.query.userName?.toLowerCase();

  const filter = {};
  if (email) {
    filter.email = email;
  }
  if (userName) {
    filter.userName = userName;
  }

  const users = await UserModel.find(filter);

  return res.status(200).json({ users });
};

// export const logout = async (req, res, next) =>{
//     try {
//       //Destroy User Session
//       req.session.destroy();
//       //Return response
//       res.status(200).json('User Logged out successfully')
//     } catch (error) {
//       next(error)
//     }
//   }

export const logout = async (req, res, next) => {
  try {
    // Check if session exists
    if (!req.session) {
      return res.sendStatus(404); // Not Found if session does not exist
    }
    req.session.destroy();

    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    next(error);
  }
};

//Logout Function
// export const logout = async(req, res, next) => {
//   try {
//     const { userName, email, password } = req.body;

//         // Check for the authorization token
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({message: 'Cannout logout'})
//     }

//         // Find the user by email or username
//     const user = await UserModel.findOne({
//       $or: [{ email }, { userName }],
//     });
//     if (!user) {
//       res.status(401).json({message: 'Cannot logout, User Not found'})
//     }
//         // Add the token to the blacklist
//     tokenBlacklist.push(token);

//         // Destroy the session
//     req.session.destroy();

//   res.send({message: 'Logged Out Successfully'});

//   } catch (error) {
//     next (error)
//   }
// }
