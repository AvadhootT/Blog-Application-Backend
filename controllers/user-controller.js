import mongoose from "mongoose";
import User from "../models/User.js";
import bcrpyt from "bcryptjs";

export const getallUsers = async (req, res, next)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);   
    }
    if(!users){
        return res.status(404).json({message: "No users found"});
    }

    res.status(200).json({
        success: true,
        users
    })
}

export const signup = async (req, res, next)=>{

    const {name, email, password} = req.body;

    let existinguser;
    try {
        existinguser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existinguser){
        return res.status(400).json({Message: "User Already exists"})
    }

    const hashedpassword = bcrpyt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedpassword,
        blogs: [],
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    return res.status(201).json({user})

}


export const login = async (req, res, next)=>{

    const {email, password} = req.body

    let existinguser;
    try {
        existinguser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existinguser){
        return res.status(404).json({Message: "User Doesn't exists"})
    }

    const isPasswordCorrect = bcrpyt.compareSync(password, existinguser.password)
    
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"});
    }

    return res.status(200).json({message: "Logged In Succesfully"});

}