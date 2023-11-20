import { RequestHandler } from "express";
import User from '../schemas/userSchema'
import bcrypt from "bcrypt"


export const getAuthenticatedUser: RequestHandler = async (req, res,next) =>{
    try {

      const user = await User.findById(req.session.userId).select('+email').exec()
      res.status(200).json(user)

    } catch (error) {
      next(error)
    }
}
// export const getAuthenticatedUser: RequestHandler = async (req, res,next) =>{
//   const authenticatedUserId = req.session.userId;

//     try {
//       if(!authenticatedUserId){
//         return res.status(401).json({ message: 'User not authenticated' });
//       }

//       const user = await User.findById(authenticatedUserId).select('+email').exec()
//       res.status(200).json(user)

//     } catch (error) {
//       next(error)
//     }
// }

interface SignupeUser {
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignupeUser, unknown> = async (req, res, next) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  console.log('Request Body:', req.body);

 try {
    if (!firstName || !lastName || !email || !passwordRaw) {
      return res.status(400).json({ message: 'Parameters missing' });
    }
    

    const existingEmail = await User.findOne({
      email: email
    }).exec();

    if (existingEmail) {
      return res.status(409).json({ message: 'A user with this email already exist. Please log in instead ' });
    }
 
    const passwordHash = await bcrypt.hash(passwordRaw, 10)

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser)

  } catch (error) {
    console.log('Error:', error); // Log the error message to the console
    next(error);
  }
}




interface LoginUser {
  email?: string,
  password?: string
}


export const login: RequestHandler<unknown, unknown, LoginUser, unknown> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Parameters missing' });
    }

    const user = await User.findOne({email:email}).exec()

    if (!user){
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    console.log(req.session.userId);
    res.status(201).json(user)



  } catch (error) {
    next(error)
  }
}


export const logout: RequestHandler = (req, res, next ) =>{
  req.session.destroy(error =>{
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}








