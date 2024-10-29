import { UserModel } from "../models/user.js";
import { mailTransport } from "../config.js/mail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { passwordSchema } from "../Schema/userSchema.js";

//Reseting a password
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpString = otp.toString();
  const hashedOtp = crypto.createHash("sha256").update(otpString).digest("hex");
  return { otpString, hashedOtp }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json("No user found with the given email");
    }

    const { otpString, hashedOtp } = generateOTP();
    user.resetToken = hashedOtp;
    user.resetTokenExpiresAt = Date.now() + 1800000; //Token expires in 30mins
    await user.save();

    // Send OTP via email
    await mailTransport.sendMail({
      from: value.email,
      to: user.email,
      subject: "Password Reset",
      text: `Please use the following OTP to complete the process of resetting your password:\n\n${otpString}\n\n. If you did not request this, please ignore this email and your password will remain unchanged.\n`
    });

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("There was an error", err);
        return res.status(500).json("Error sending email");
      } else {
        res
          .status(200)
          .json(
            "If your email is registered with us, you will receive a password recovery instruction."
          );
      }
    });
  } catch (error) {
    next(error)
  }
};



export const verifyCode = async (req, res, next) => {
  try {
    const { email, newOtp } = req.body;

    //Validate email format
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const otpHash = newOtp.toString();

    const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");

    if (user.resetToken !== hashedOtp) {
      return res.st(400).json({ message: "Code Is not Valid" });
    }

    if (Date.now() > user.resetPasswordExpiresAt) {
      return res.status(400).json({
        message: "Invalid or expired"
      });
    }
    return res.status(200).json({message: "Code Is Valid" });
  } catch (error) {
    next(error);
  }
};


 export const resetPassword = async (req, res, next) => {
  const { email, newOtp, password } = req.body;
  const otpHash = newOtp.toString();

  const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");
  try {
    const user = await UserModel.findOne({
      email,
      resetToken: hashedOtp,
      resetTokenExpiresAt: {$gt: Date.now() },
    });
if (!user) {
  return res.status(400).json(
    "Invalid or expired verification code. Please restart the password recovery process."
  );
}

// Validate the new password
const { error } = passwordSchema.validate({ password });
if (error) {
  return res.status(400).json(error.details[0].message);
}

// Ensure the new password is different from the previous password
const isSamePassword = await bcrypt.compare(password, user.password);
if (isSamePassword) {
  return res
    .status(400)
    .json("New password must be different from the old password.");
}

// Resetting the password
const hashedPassword = bcrypt.hashSync(password, 12);
user.password = hashedPassword;

user.resetToken = undefined;
user.resetTokenExpiresAt = undefined;

await user.save();

return res
  .status(200)
  .json(
    "Your password has been successfully reset. You can now log in with your new password."
  );

  } catch (error) {
    next(error)
  }
 };