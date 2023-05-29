import React, { useEffect, useState } from 'react';

import axios from "axios";

import { Card, CardHeader, IconButton, Avatar, Grid, MenuItem, Menu } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import EditModal from './components/EditModal';

import { useNavigate } from 'react-router-dom'

import { Button } from "@mui/material";
import { config } from '../../utility/config';


function Users() {
    const [userList, setUserList] = useState<any>([]);
    const [deactivateUserList,setDeactivateUserList] = useState<any>([])
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deactivateAnchorEl, setDeactivateAnchorEl] = useState(null);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeactivateMenuOpen = (event: any) => {
        setDeactivateAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
        setDeactivateAnchorEl(null)
    }

    const fetch = () => {
        axios.get(`${config.url}/user/`).then((data) => {
            const user = data.data.data;
            setUserList(() => user.filter((item: any) => item.active))
            setDeactivateUserList(()=> user.filter((item:any)=>!item.active))
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        fetch();
    }, [open]);

    const handleRemove = (key: string) => {
        axios.get(`${config.url}/user/delete/${key}`).then((data) => {
            if (data) {
                fetch();
            }
        }).catch(err => console.log(err))
        setAnchorEl(null);
    };

    const handleStatus = (key: string, status: string) => {
        axios.get(`${config.url}/user/${key}/${status}`).then((data) => {
            if (data) {
                fetch();
                handleMenuClose();
            }
        }).catch(err => console.log(err))
    }

    return (
        <div style={{ width: "100%", height: "100vh", display: 'flex' }}>
            <div style={{ backgroundColor: "#5E53E9", display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "20%", borderRadius: "0.5rem" }}>
                <Button variant="contained" onClick={() => navigate('/companies')}>Manage Company</Button>
                <Button variant="contained" style={{ marginTop: "2rem" }}>Manage User</Button>
            </div>
            <div style={{ marginLeft: "2rem", width: "100%" }}>
                <div>
                    <h1>Users</h1>
                </div>
                <div style={{ float: "right", marginRight: "10rem" }} >
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                        Add
                    </Button>
                </div>
                <Grid container spacing={2} sx={{ width: "90%" }}>
                    {userList.map((item: any) => (
                        <>
                            <Grid item xs={8} sm={4} md={3} lg={4} key={item.id}>
                                <Card sx={{ minWidth: 280, cursor: "pointer", marginLeft: "2rem" }} >
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: 'red' }} onClick={() => navigate(`/user/${item._id}`)}>
                                                {item.firstName[0].toUpperCase() + item.lastName[0].toUpperCase()}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton onClick={handleMenuOpen}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={item.firstName + " " + item.lastName}
                                        subheader={item.email}
                                    />
                                </Card>
                            </Grid>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleRemove(item._id)}>Delete</MenuItem>
                                <MenuItem onClick={() => handleStatus(item._id, "deactivate")}>Deactivate</MenuItem>
                            </Menu>
                        </>

                    ))}
                </Grid>
                <div style={{marginTop: "2rem"}}>
                    <h3>Deactivate Users</h3>
                    <Grid container spacing={2} sx={{ width: "90%" }}>
                        {deactivateUserList.map((item: any) => (
                            <>
                                <Grid item xs={8} sm={4} md={3} lg={4} key={item.id}>
                                    <Card sx={{ minWidth: 280, cursor: "pointer", marginLeft: "2rem",backgroundColor:"lightgrey" }} >
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: 'lightgrey',color:'black' }}>
                                                    {item.firstName[0].toUpperCase() + item.lastName[0].toUpperCase()}
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton onClick={handleDeactivateMenuOpen}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={item.firstName + " " + item.lastName}
                                            subheader={item.email}
                                        />
                                    </Card>
                                </Grid>
                                <Menu
                                    id="menu1"
                                    anchorEl={deactivateAnchorEl}
                                    open={Boolean(deactivateAnchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => handleRemove(item._id)}>Delete</MenuItem>
                                    <MenuItem onClick={() => handleStatus(item._id, "activate")}>Activate</MenuItem>
                                </Menu>
                            </>

                        ))}
                    </Grid>
                </div>
                {open && (
                    <EditModal open={open} setOpen={setOpen} edit={false} />
                )}
            </div>
        </div>
    )
}

export default Users;