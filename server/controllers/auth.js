import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signup = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists",success:false});
        } 
        const newUser = new User({username, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        const token = jwt.sign(
            {email: newUser.email, _id: newUser._id}, // Payload
            process.env.JWT_SECRET,                                  // Secret
            {expiresIn: '24h'}                           // Expiration
        );
        res.status(200).json({
            message: "Login successful",
            token: token,
            success: true,
            email: newUser.email,
            username: newUser.username // Ensure username is returned for consistency
        }); 
    } catch (error) {
        res.status(500).json({message: "Internal server ",error: error.message,success:false});
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const errorMsg= "Authentication failed. Invalid email or password.";
        if(!user){
            return res.status(400).json({message: errorMsg,success:false});
        } 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: errorMsg,success:false});
        }
        const jwtToken= jwt.sign(
            {email: user.email,_id:user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '24h'});
        res.status(200).json({message: "Login successful",token: jwtToken,success:true,email:user.email});
    } catch (error) {
        res.status(500).json({message: "Internal server error",success:false});
    }
}
