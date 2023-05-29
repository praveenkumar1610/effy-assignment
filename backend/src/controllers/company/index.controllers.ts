import { findall,createCompany,findById,updateCompany,softDeleteCompany } from "../../services/company/company.service";

import { createCompanyType,updateCompanyType } from "../../types/company/company.service.type";

export const getCompanyAllController = async () => {
    try{
        const getAllCompany = await findall();
        return getAllCompany
    }
    catch(err){
        return err
    }
}

export const getCompanyByIdController = async (id:String) => {
    try{
        const getCompany = await findById(id);
        if(!getCompany[0].isDeleted){
            return getCompany[0]
        }
        return []
    }
    catch(err){
        return err
    }
}


export const createCompanyController = async(req:createCompanyType)=>{
    try{
        const createCompanyData = await createCompany(req);
        return createCompanyData;
    }
    catch(err){
        return err
    }  
}

export const updateCompanyController = async(req:updateCompanyType)=>{
    try{
        const updateCompanyData = await updateCompany(req);
        return updateCompanyData;
    }
    catch(err){
        return err
    }  
}


export const deleteCompanyController = async(id:string)=>{
    try{
        const updateCompanyData = await softDeleteCompany(id);
        if(updateCompanyData.modifiedCount)
            return "Company Deleted Successfully"
        return "Company not Deleted"
    }
    catch(err){
        return err
    }  
}


