import {Company} from '../../models/company';
import {createCompanyType,updateCompanyType} from '../../types/company/company.service.type';


export const findall = async ()=>{
    const getCompaniesData = await Company.find({isDeleted:false});
    return getCompaniesData;
}

export const findById = async (id:String)=>{
    const getCompanyData = await Company.find({_id:id})
    return getCompanyData;
}

export const createCompany = async ({companyName,companyAddress,companyCoordinates,employees}:createCompanyType)=>{
    const createCompany = await Company.create({companyName:companyName,companyAddress:companyAddress,coordinates:companyCoordinates})
    return createCompany;
}

export const updateCompany = async({companyName,companyAddress,companyCoordinates,employees,id}:updateCompanyType) =>{
    const company:any = await Company.findById(id);
    company.companyName = companyName;
    company.companyAddress = companyAddress;
    company.companyCoordinates = companyCoordinates;

    const updateCompanyData= await company.save();
    return updateCompanyData
}

export const softDeleteCompany = async(id:string)=>{
    const company = await Company.updateOne(
        { _id: id },
        {
          $set: {
            isDeleted:true
          },
        });
    return company;
}