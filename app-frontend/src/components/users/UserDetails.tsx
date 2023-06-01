import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';

import { Button, FormControl,Typography } from "@mui/material";
import EditModal from './components/EditModal';
import { config } from '../../utility/config';

function UserDetails() {
    const [userDetail, setUserDetail] = useState<any>([]);
    const [loader,setLoader] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`${config.url}/user/${userId}`).then((data) => {setUserDetail(data.data.data);setLoader(false)}).catch(err => console.log(err))
    }, [open])

    return (
        <div style={{ width: "100%", height: "100vh", display: 'flex' }}>
            <div style={{ backgroundColor: "#5E53E9", display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "20%", borderRadius: "0.5rem" }}>
                <Button variant="contained" onClick={() => navigate('/companies')}>Manage Company</Button>
                <Button variant="contained" style={{ marginTop: "2rem" }} onClick={() => navigate('/users')}>Manage User</Button>
            </div>
            <div style={{ marginLeft: "2rem", width: "100%" }}>
                <div>
                    <h1>User</h1>
                </div>
                <div style={{ float: "right", marginRight: "10rem" }} >
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpen(true)}>
                        Edit
                    </Button>
                </div>
                {!loader && (
                    <div style={{ marginTop: "6rem", minWidth: "90%", display: 'flex', justifyContent: "flex-start" }}>
                        <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
                            <div style={{ marginTop: "2rem" }}>
                                <Typography>First Name:</Typography>
                                <Typography>Last Name:</Typography>
                                <Typography>Email:</Typography>
                                <Typography>Designation:</Typography>
                                <Typography>Date of Birth:</Typography>
                            </div>
                            <div style={{ marginTop: "2rem" }}>
                                <FormControl>
                                    <Typography>{userDetail?.firstName}</Typography>
                                    <Typography>{userDetail?.lastName}</Typography>
                                    <Typography>{userDetail?.email}</Typography>
                                    <Typography>{userDetail?.designation}</Typography>
                                    <Typography>{userDetail?.dob}</Typography>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* {open && (
                <EditModal open={open} setOpen={setOpen} edit={true} editValue={userDetail} />
            )} */}
        </div>
    )
}

export default UserDetails;