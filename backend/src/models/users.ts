import mongoose from "mongoose";    


const UserSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    designation:{type:String},
    dob:{type:String},
    active:{type:Boolean,default:true},
    isDeleted:{type:Boolean,default:false},
    company:{type:mongoose.Schema.Types.ObjectId ,ref:"company",default:null},
},{
    timestamps:true
});


const User = mongoose.model('users',UserSchema)

export {User};