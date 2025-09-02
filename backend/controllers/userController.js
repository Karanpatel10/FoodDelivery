import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import orderModel from "../models/OrderModels.js";
import promoModel from "../models/promoModels.js";

// login user 

const loginUser=async(req,res)=>{

    const {email,password}=req.body;
    try{

        const user=await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({success:false,message:"User not found"}); 
        }
        
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch) {
            return res.status(400).json({success:false,message:"Password didn't match"});
         }

         const token=await createToken(user._id);
         res.json({success:true,message:"Logged in successfully",token:token,user:{name:user.name,email:user.email,role:user.role},});
        

    }catch(error){
         
        return res.status(500).json({success:false,message:error.message});
        }

}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"2h"})
}


// register user

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        // checking user already exits
         const exits=await userModel.findOne({email});
         if(exits){
            return res.status(400).json({success:false,msg:"User already exists"});
         }

        //validating email formate & strong password 
        
        if(!validator.isEmail(email))
        {
            return res.status(400).json({success:false,msg:"please enter Invalid email"});
        }

        // password check
        if(password.length<8)
        {
            return res.status(400).json({success:false,msg:"password is too weak"});
        }

        // hasing user passwrod
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
            });

       const user= await newUser.save();
       const token=await createToken(user._id);
       res.status(201).json({success:true,msg:"User created successfully",token,user:{name:user.name,email:user.email}});

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,msg:"Error in creating user"});
    }

}

// Profile update

const profileupdate=async(req,res)=>{
    // get user profile for update
    try{

        const user=await userModel.findById(req.user.userId).select("-password");
        res.json({success:true,message:"Profile infomation",user:user})

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error to find User Profile"})
    }
}

// update profile details

const updateprofileinfo=async(req,res)=>{
    try{
        const{mobile,address,DOB,gender}=req.body;
        const updatedUser=await userModel.findByIdAndUpdate(req.user.userId,{mobile,address,DOB,gender},{new:true});
        res.json({success:true,message:"User Information updated"});

    }catch(error){
        console.log("error");
        res.json({success:false,message:"Error updated profie infor"})
    }
}

// delete permanatly with order 
const deleteprofile=async(req,res)=>{
    try{
        const userId=req.user.userId;
        await userModel.findByIdAndDelete(userId);
        await orderModel.deleteMany({userId:userId});
        await promoModel.deleteMany({ userId:userId });
        res.json({success:true,message:'Delete profile'});
    }catch(error){
        console.log(error);
        res.json({success:false,message:'Error to delete profile'});
    }
}

export  {loginUser,registerUser,profileupdate,deleteprofile,updateprofileinfo};