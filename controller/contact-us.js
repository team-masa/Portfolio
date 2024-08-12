import { mailTransport } from "../config.js/mail.js";
import { ContactModel } from "../models/contact-us.js";

import { contactSchema } from "../Schema/contact-Us.js";
import { UserModel } from "../models/user";



export const contactUs = async(req, res, next) => {
    try {
        // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
        const {error, value} = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }
 // SAVE THE CONTACT FORM SUBMISSION TO THE DATABASE
       await ContactModel.create(value);
           // SEND AN EMAIL NOTIFICATION
           
        const user = await UserModel.findOne({email }); 
        if (!user) {
            return res.status(500).send('User not found.')
        }
        
        await mailTransport.sendMail({
            from: value.email, 
            to: user.email,
            subject: ` Portfolio Contact Message From ${value.name}`, 
            text: `${value.message}`, 
        });

        // RESPOND TO THE USER
        res.status(201).json({message:'Your message has been sent successfully.'});

    } catch (error) {
        next(error)
    }
}