import React, { useEffect, useState } from 'react';

import axios from "axios";

import { Card, CardHeader, IconButton, Avatar, Grid, MenuItem, Menu, Typography, Divider, TextField, InputAdornment } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

import EditModal from './components/EditModal';

import { useNavigate } from 'react-router-dom'

import UsersTable from './components/UsersTable';

import { Button } from "@mui/material";
import { config } from '../../utility/config';


const useStyles=makeStyles((theme)=>({
    button: {
        "&:hover": {
          boxShadow: "none",
          backgroundColor: "#fff"
        }
    }
}))


function Users() {
    const [userList, setUserList] = useState<any>([]);
    const [deactivateUserList, setDeactivateUserList] = useState<any>([])
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const classes=useStyles();
    const [loader,setLoader] = useState<boolean>(false);
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
            setUserList(user)
            // setUserList(() => user.filter((item: any) => item.active))
            setDeactivateUserList(() => user.filter((item: any) => !item.active))
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        setLoader(false)
        fetch();
    }, [open,loader]);

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
            <div style={{ backgroundColor: "#5E7187", width: "20%", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                    <PieChartIcon /><Typography variant="h6">Salesman</Typography>
                </div>
                <div style={{ marginLeft: '3rem', marginTop: '3rem' }}>
                    <div>
                        <Typography variant='subtitle2' sx={{ fontSize: 14 }}>MENU</Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "1rem" }}>
                            <DashboardIcon />
                            <Button variant="text" sx={{ color: "#fff ", fontSize: 12 }} onClick={()=>navigate('/companies')}>
                                Company Management
                            </Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "1rem",backgroundColor:"white",color: "#000 " }}>
                            <DashboardIcon />
                            <Button variant="text" sx={{ color: "#000 ", fontSize: 12,backgroundColor:"white" }} className={classes.button}>
                                Employee Management
                            </Button>
                        </div>
                    </div>
                    <Divider sx={{ width: '10rem', marginTop: '1.5rem' }} />
                </div>
                <div style={{ marginLeft: '3rem', marginTop: '3rem' }}>
                    <div>
                        <Typography variant='subtitle2' sx={{ fontSize: 14 }}>SETTINGS</Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Button variant="text" sx={{ color: "#fff ", marginTop: '1rem', fontSize: 12 }}>Profile</Button>
                        <Button variant="text" sx={{ color: "#fff ", fontSize: 12 }}>Help Center</Button>
                        <Button variant="text" onClick={() => navigate('/companies')} sx={{ color: "#fff ", fontSize: 12 }}>Settings</Button>
                    </div>
                    <Divider sx={{ width: '10rem', marginTop: '1.5rem' }} />
                </div>
            </div>
            <div>
                <div style={{ width: '80vw', padding: '0.8rem', borderBottom: '1px solid #cdcd' }}>
                    <TextField
                        label=""
                        variant='standard'
                        placeholder='search.....'
                        sx={{ marginLeft: 4.5, width: '10%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment>,
                        }}
                    />
                </div>
                <div style={{ marginLeft: "2rem", width: "100%" }}>
                    <div>
                        <h1>Employee</h1>
                    </div>
                    <div style={{ float: "right", marginRight: "10rem" }} >
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                            Add
                        </Button>
                    </div>
                    {/* <Grid container spacing={2} sx={{ width: "90%" }}>
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
                    </Grid> */}
                </div>
                <div>
                    <UsersTable userList={userList} setLoader={setLoader}/>
                </div>
                {open && (
                    <EditModal open={open} setOpen={setOpen} edit={false} setLoader={setLoader}/>
                )}
            </div>
        </div>
    )
}

export default Users;