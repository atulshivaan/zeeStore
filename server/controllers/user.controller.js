
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRegister = async(req,res)=>{
const {name ,email ,password}=req.body;
if(!name || !email || !password)
{
    return res.status(400).json({
        success:false,
        mesaage:"All fields are required"
    })
}
const emailExist = await User.findOne({email});
if(emailExist){
    return res.status(400).json({
        success:false,
        message:"User already Exist"
    })
}
const hashPassword = await bcrypt.hash(password,10)
const newUser = await User.create({
    name,
    email,
    password:hashPassword,
    
})
await newUser.save();




res.status(201).json({
    success:true,
    message:"User regsitered Succesfully",
    newUser,
  
})



}


export const userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  
    // Generate JWT token (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, 
    });
  
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  };