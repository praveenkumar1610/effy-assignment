import {User} from '../../models/users';
import { createUserType,updateUserType } from '../../types/user/user.service.type';



export const findall = async ()=>{
    const getUsersData = await User.find({isDeleted:false}).populate('company');
    return getUsersData;
}

export const findById = async (id:String)=>{
    const getUserData = await User.find({_id:id}).lean().populate('company',{companyName:1})
    return getUserData;
}

export const findCompanyId = async (id:String)=>{
  const getUserData = await User.find({company:id,isDeleted:false,active:true})
  return getUserData;
}

export const createUser = async ({firstName,lastName,designation,dob,email}:createUserType)=>{
    const createUser = await User.create({firstName:firstName,lastName:lastName,designation:designation,dob:dob,email:email})
    return createUser;
}

export const removeUserFromCompany = async(id:String) =>{
  const removeUser = await User.findOneAndUpdate({_id:id},{$set:{company:null}});
  return removeUser
}


export const addUserToCompany = async(userId:String,companyId:string) =>{
  const removeUser = await User.findOneAndUpdate({_id:userId},{$set:{company:companyId}});
  return removeUser
}


export const updateUser = async({firstName,lastName,designation,dob,email,id}:updateUserType) =>{
    const user:any = await User.findById(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.designation = designation;
    user.dob = dob;
    user.email = email;

    const updateUserData= await user.save();
    return updateUserData
}

export const softDeleteUser = async(id:string)=>{
    const user = await User.updateOne(
        { _id: id },
        {
          $set: {
            isDeleted:true
          },
        });
    return user;
}

export const changeStatusUser = async(status:string,id:string)=>{
    const user = await User.updateOne(
        { _id: id },
        {
          $set: {
            active:status === "activate" ? true : false
          },
        });
    return user;
}