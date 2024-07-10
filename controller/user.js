import { UserModel } from '../models/user.js'
import { userSchema } from '../schema/user.js'

export const signup = (req, res) =>{

    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(404).send(error.details[0].message)
    }


}