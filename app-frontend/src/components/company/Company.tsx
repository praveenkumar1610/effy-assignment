import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardHeader, CardMedia, IconButton, CardContent, Typography, Avatar, Grid, Menu, MenuItem } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';


import EditModal from "./components/EditModal";

import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";

import { config } from "../../utility/config";

function Company() {
    const [companyList, setCompanyList] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchCompany=()=>{
        axios.get(`${config.url}/company/`).then((data) => setCompanyList(data.data.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCompany()
    }, [open]);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete=(key:String)=>{
        axios.get(`${config.url}/company/delete/${key}`).then((data) => {
            if(data){
                setAnchorEl(null);
                fetchCompany();
            }
        }).catch(err => console.log(err))
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: 'flex' }}>
            <div style={{ backgroundColor: "#5E53E9", display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "20%", borderRadius: "0.5rem" }}>
                <Button variant="contained" onClick={() => navigate('/companies')}>Manage Company</Button>
                <Button variant="contained" style={{ marginTop: "2rem" }} onClick={() => navigate('/users')}>Manage User</Button>
            </div>
            <div style={{ marginLeft: "2rem", width: "100%" }}>
                <div>
                    <h1>Companies</h1>
                </div>
                <div style={{ float: "right", marginRight: "10rem" }} >
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                        Add
                    </Button>
                </div>
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
                {open && (
                    <EditModal open={open} setOpen={setOpen} edit={false} />
                )}
            </div>
        </div>
    )
}

export default Company;