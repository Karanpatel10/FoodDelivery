import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        mobile:{type:Number},
        address:{type:String},
        DOB:{type:Date},
        gender:{type:String},
        role:{type:String,default:"user"},
        cartData:{type:Object,default:{}}
    },{minimize:false}
)

const userModel=mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;