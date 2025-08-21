import foodModel from "../models/foodModels.js";
import fs from 'fs';

// count food item

const countfood=async(req,res)=>{
    try{
        const f_count=await foodModel.countDocuments();
        res.json({success:true,f_count});

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Failed to add food item"});
    }
}

// add food item

const addFood=async(req,res)=>{

    let image_filename=`${req.file.filename}`;

    const food= new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    })

    try{
        await food.save();
        res.status(201).json({success:true,message:"Food item added successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Failed to add food item"})
    }
}


// all food list 

const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}

// Remove food item

const removeFood=async(req,res)=>{
    try{
        const foods=await foodModel.findById(req.body.id);
        if(!foods){
            return res.json({success:false,message:'Food item not found'})
            }
        fs.unlink(`uploads/${foods.image}`,(err)=>{
            if(err){
                console.log("Failed to delete image file",err);
            }
        })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'food Remove data successfully'})
        
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Fail to remove"})
    }
}

export {addFood,listFood,removeFood,countfood};