export interface createCompanyType{
    companyName:string,
    companyAddress:string,
    companyCoordinates:string[],
    employees:string[]
}


export interface updateCompanyType{
    companyName:string,
    companyAddress:string,
    companyCoordinates:string[],
    employees:string[],
    id:string
}