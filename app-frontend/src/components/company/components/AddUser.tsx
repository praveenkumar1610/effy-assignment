import { useEffect, useState } from "react";

import { Autocomplete, TextField, Button } from '@mui/material';

import axios from "axios";
import { config } from "../../../utility/config";


interface Props{
    setShowAddUser:(value:boolean) => void,
    setLoader:(value:boolean) => void,
    companyId:string | undefined
}


function AddUser({setShowAddUser,companyId,setLoader}:Props) {
    const [userList, setUserList] = useState([]);
    const [userSelect, setUserSelect] = useState(userList[0])

    useEffect(() => {
        axios.get(`${config.url}/user/`).then((data) =>{ 
            
        setUserList(()=>data.data.data.filter((item:any) => item.company === null &&  item.active == true))}).catch(err => console.log(err))
    },[])

    const handleOptionChange = (event:any, option:any) => {
        setUserSelect(option?._id || null);
    };

    const handleAdd=()=>{
        setLoader(true)
        if(companyId){
            axios.put(`${config.url}/user/company/add/${userSelect}`,{
                companyId
            }).then((data) => {
                if(data){
                    setLoader(false)
                    setShowAddUser(false)
                }
            }).catch(err => console.log(err))
        }
    }
    
   


    return (
        <div  style={{ display: "flex", justifyContent: 'center' }}>
            <div>
                <Autocomplete
                    options={userList} 
                    value = {userSelect}
                    getOptionLabel={(option:any) => option.firstName + " " + option.lastName }
                    sx={{ width: 550, marginTop: 4 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Users"
                            variant="outlined"
                        />
                    )}
                    onChange={handleOptionChange}
                />
                <div style={{ marginTop: "1rem" }}>
                    <Button variant="contained" onClick={handleAdd} >Add User</Button> 
                    <Button variant="contained" sx={{marginLeft:"2rem"}} onClick={()=>setShowAddUser(false)} >Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default AddUser;