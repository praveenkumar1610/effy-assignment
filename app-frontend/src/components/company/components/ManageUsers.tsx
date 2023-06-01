import { useEffect, useState } from 'react';

import { Grid, Card, CardHeader, Avatar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import AddIcon from '@mui/icons-material/Add';

import axios from 'axios';
import AddUser from './AddUser';

import { config } from '../../../utility/config';

interface Props {
    companyId: string | undefined
}

function ManageUsers({ companyId }: Props) {
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose=()=>{
        setAnchorEl(null)
    }

    const fetchUsers=()=>{
        axios.get(`${config.url}/user/company/${companyId}`).then((data) => {
            if (data.data.data) {
                setUsers(data.data.data); setLoader(false)
            };
        }).catch(err => console.log(err))
    }

    const handleRemove = (key: string) => {
        console.log(key)
        setLoader(true)
        axios.get(`${config.url}/user/company/remove/${key}`).then((data) => {
            if (data) {
                fetchUsers();
                setLoader(false);  
            }
        }).catch(err => console.log(err))
        setAnchorEl(null);
    };


    useEffect(() => {
        fetchUsers();
    }, [loader])

    return (
        <div style={{ marginTop: "3rem" }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: "10rem" }}>
                    <h2>Users</h2>
                    <Button variant="outlined" startIcon={<AddIcon />} sx={{ width: "7rem" }} onClick={() => setShowAddUser(true)}>
                        Add
                    </Button>
                </div>
                <div>
                    {showAddUser && (
                        <AddUser setShowAddUser={setShowAddUser} companyId={companyId} setLoader={setLoader}/>
                    )}
                </div>
                <div style={{marginTop:"1rem"}}>
                    {!loader && (
                        users.length ? (
                            <>
                                <Grid container spacing={2} sx={{ width: "90%" }}>
                                    {users.map((item: any) => (
                                        <>
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                                <Card sx={{ minWidth: 350, cursor: "pointer" }} >
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{ bgcolor: 'red' }}>
                                                                {item.firstName[0].toUpperCase() + item.lastName[0].toUpperCase()}
                                                            </Avatar>
                                                        }
                                                        action={
                                                            <IconButton aria-label="settings" onClick={handleMenuOpen}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        }
                                                        title={item.firstName + item.lastName}
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
                                                <MenuItem onClick={() => handleRemove(item._id)}>Remove</MenuItem>
                                            </Menu>
                                        </>


                                    ))}
                                </Grid>
                            </>

                        ) : (
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <div style={{ display: 'flex', justifyContent: "space-around", alignItems: 'center' }}>
                                    <PeopleAltIcon />
                                    <h1>Users Not Available</h1>
                                </div>

                                <h3>Add the User through Add User option</h3>
                            </div>
                        )
                    )}
                </div>

            </div>
        </div>
    )
}

export default ManageUsers;