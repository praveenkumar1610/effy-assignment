export interface createUserType{
    firstName:String,
    lastName:String,
    email:String,
    designation:String,
    dob:String,
    active?:Boolean,
}

export interface updateUserType{
    firstName:String,
    lastName:String,
    email:String,
    designation:String,
    dob:String,
    id:string
}
