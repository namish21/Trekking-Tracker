import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { hashSync } from "bcrypt";

export const getAllUsers = async (req,res) =>{
    let users;
    try{
        users = await User.find();
    }
    catch (err) {
        return console. log(err);
    }
    if (!users){
        return res.status(500).json({ message: "unexpected error" });
    }

    return res.status(200).json({users});   
}

export const getUserById = async( req , res ) => {

    const id = req.params.id;
    
    let user;
    try {
        user = await User.findById(id).populate("posts");
    } catch (error) {
        return console.log(err);
    }

    if( !user ){
        return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ user });
}

export const signup = async ( req , res , next ) => {
    
    const { name , email , password } = req.body;

    if( !name && name.trim() === "" && !email && email.trim() === "" && !password && password.length < 6 ){
        return res.status(422).json({ message: "Invalid Data" });
    }

    const hashPassword = hashSync(password,10);

    let user;
    try {
      user = new User({ email, name, password : hashPassword });
      await user.save();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
  
    return res.status(201).json({ user });
}

export const login = async ( req , res , next ) => {

    const { email , password } = req.body;

    if( !email && email.trim() === ""  && !password && password.length < 6 ){
        return res.status(422).json( { message: "Invalid Data" } );
    }

    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }

    if( !existingUser ){
        return res.status(404).json({ message: "No user found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if( !isPasswordCorrect ){
        return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ id:existingUser._id , message:"Login Successful" });

}