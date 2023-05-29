import { findall,findById,createUser,updateUser, changeStatusUser, softDeleteUser,findCompanyId,removeUserFromCompany,addUserToCompany } from "../../services/user/user.service";
import { createUserType, updateUserType } from "../../types/user/user.service.type";


export const getUserAllController = async () => {
    try{
        const getAllUser = await findall();
        const getUserWithoutDeleted = getAllUser.filter((item)=> !item.isDeleted)
        return getUserWithoutDeleted
    }
    catch(err){
        return err
    }
}


export const getUserByIdController = async (id:String) => {
    try{
        const getUser = await findById(id);
        if(!getUser[0].isDeleted){
            return getUser[0]
        }
        return []
    }
    catch(err){
        return err
    }
}


export const getUserByCompanyId = async (id:String) => {
    try{
        const getUser = await findCompanyId(id);
        if(getUser){
            return getUser
        }
        return []
    }
    catch(err){
        return err
    }
}

export const removeUserfromCompanyController = async(id:string)=>{
    try{
        const removed = await removeUserFromCompany(id);
        if(removed){
            return removed
        }
        return []
    }
    catch(err){
        return err
    }
}

export const addUserfromCompanyController = async(userId:string,companyId:string)=>{
    try{
        const added = await addUserToCompany(userId,companyId);
        if(added){
            return added
        }
        return []
    }
    catch(err){
        return err
    }
}



export const createUserController = async(req:createUserType)=>{
    try{
        const createUserData = await createUser(req);
        return createUserData;
    }
    catch(err){
        return err
    }  
}


export const updateUserController = async(req:updateUserType)=>{
    try{
        const updateUserData = await updateUser(req);
        return updateUserData;
    }
    catch(err){
        return err
    }  
}

export const changeStatusController = async(status:string,id:string)=>{
    try{
        const updateCompanyData = await changeStatusUser(status,id);
        if(updateCompanyData.modifiedCount)
            return "User status Changed Successfully"
        return "User status not Updated"
    }
    catch(err){
        return err
    }  
}

export const deleteUserController = async(id:string)=>{
    try{
        const updateUserData = await softDeleteUser(id);
        if(updateUserData.modifiedCount)
            return "User Deleted Successfully"
        return "User not Deleted"
    }
    catch(err){
        return err
    }  
}



