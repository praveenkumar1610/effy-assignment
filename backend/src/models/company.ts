import mongoose from 'mongoose';


const CompanySchema = new mongoose.Schema({
    companyName:{type:String},
    companyAddress:{type:String},
    coordinates:[{type:Number}],
    isDeleted:{type:Boolean,default:false}
},
{
    timestamps:true
});


const Company = mongoose.model("company",CompanySchema)

export {Company};