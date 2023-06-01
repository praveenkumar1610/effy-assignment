import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardHeader, CardMedia, IconButton, CardContent, Divider, Typography, Avatar, Grid, Menu, MenuItem, TextField, InputAdornment,Badge } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';


import EditModal from "./components/EditModal";

import PieChartIcon from '@mui/icons-material/PieChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

import { config } from "../../utility/config";
import CompanyTable from "./components/CompanyTable";

import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Company() {
    const [companyList, setCompanyList] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchCompany = () => {
        axios.get(`${config.url}/company/`).then((data) => setCompanyList(data.data.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        setLoader(false)
        fetchCompany()

    }, [open, loader]);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };



    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: 'flex' }}>
            <div style={{ backgroundColor: "#5E7187", width: "23%", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                    <PieChartIcon /><Typography variant="h6">Salesman</Typography>
                </div>
                <div style={{ marginLeft: '3rem', marginTop: '3rem' }}>
                    <div>
                        <Typography variant='subtitle2' sx={{ fontSize: 14 }}>MENU</Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "1rem", backgroundColor: "white", color: "#000 " }}>
                            <DashboardIcon />
                            <Button variant="text" sx={{ color: "#000 ", fontSize: 12, backgroundColor: "white" }} >
                                Company Management
                            </Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: "1rem" }}>
                            <DashboardIcon />
                            <Button variant="text" sx={{ color: "#fff ", fontSize: 12 }} onClick={() => navigate('/users')}>
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
                <div style={{ width: '80vw', padding: '0.8rem', borderBottom: '1px solid #cdcd',display:'flex',justifyContent:'space-between' }}>
                    <div>
                    </div>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>

                </div>
                <div style={{ marginLeft: "2rem", width: "100%" }}>
                    <div>
                        <h1>Company</h1>
                    </div>
                    <div style={{ float: "right", marginRight: "10rem" }} >
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                            Add
                        </Button>
                    </div>
                </div>
                <div>
                    <CompanyTable companyList={companyList} setLoader={setLoader} />
                </div>
                {open && (
                    <EditModal open={open} setOpen={setOpen} edit={false} setLoader={setLoader} />
                )}
            </div>
            {/* <div style={{ marginLeft: "2rem", width: "100%" }}>
                <Grid container spacing={2} sx={{ width: "90%" }}>
                    {companyList.map((item: any) => (
                        <>
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <Card sx={{ maxWidth: 340, cursor: "pointer" }} >
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" onClick={() => navigate(`/company/${item._id}`)}>
                                                {item.companyName[0].toUpperCase()}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings" onClick={handleMenuOpen}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={item.companyName}
                                        subheader={item.companyAddress}
                                    />
                                </Card>
                            </Grid>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={()=>handleDelete(item._id)}>Delete</MenuItem>
                            </Menu>
                        </>

                    ))}
                </Grid>
            </div> */}
        </div>
    )
}

export default Company;