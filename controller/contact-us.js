import { mailTransport } from "../config.js/mail.js";
import { ContactModel } from "../models/contact-us.js";
import { contactSchema } from "../Schema/contact-Us.js";
import { UserModel } from "../models/user.js";



export const contactUs = async(req, res, next) => {
    try {
        // VALIDATE THE REQUEST BODY AGAINST THE SCHEMA
        const {error, value} = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }

          // Extract portfolio owner ID from the request (could be passed from the frontend)
    const { portfolioOwnerId } = req.body;

        // Fetch the portfolio owner's details from the database
        const portfolioOwner = await UserModel.findById(portfolioOwnerId);
        if (!portfolioOwner) {
          return res.status(404).send('Portfolio owner not found.');
        }
    

        // Check if the user is logged in (authenticated)
    let user = null;
    if (req.user?.id) {
      user = await UserModel.findById(req.user?.id);
      if (!user) {
        return res.status(401).send('Authenticated user not found.');
      }
    };


    // Create message data (associate with user if logged in, otherwise null for visitors)
    const messageData = {
        ...value,
        user: user ? user.id : null,  // Associate with authenticated user or leave as null for visitors
      };
  

      // SAVE THE CONTACT FORM SUBMISSION TO THE DATABASE
    const message = await ContactModel.create(messageData);

    if (user) {
        // If user is logged in, add the message ID to their messages array and save
        user.message.push(message.id);
        await user.save();
      }
        
       // SEND AN EMAIL NOTIFICATION
        await mailTransport.sendMail({
            from: value.email, 
            to: portfolioOwner.email,
            subject: `New Message from ${value.name}, from MasaPortfolio`,
            text: value.message, 
        });

        // RESPONSE
        res.status(201).json({message:'Your message has been sent successfully.'});

    } catch (error) {
        next(error)
    }
}