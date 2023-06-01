import { useState, useEffect } from 'react';

import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Chip,
    IconButton, Menu, MenuItem
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';


import EditModal from './EditModal';
import DialogModal from './Dialog';

import axios from 'axios';
import { config } from '../../../utility/config';


function UsersTable({ userList, setLoader }: any) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<any>({});
    const [dialogOpen,setDialogOpen] = useState<boolean>(false);


    useEffect(() => { }, [open])

    const status = (key: string, status: string) => {
        axios.get(`${config.url}/user/${key}/${status}`).then((data) => {
            if (data) {
                setLoader(true)
                handleMenuClose();
            }
        }).catch(err => console.log(err))
    }

    const handleRemove = (key: string) => {
        axios.get(`${config.url}/user/delete/${key}`).then((data) => {
            if (data) {
                setLoader(true)
                handleMenuClose();
            }
        }).catch(err => console.log(err))
    };

    const handleCompanyRemove = (key: string) => {
        axios.get(`${config.url}/user/company/remove/${key}`).then((data) => {
            if (data) {
                setLoader(true);  
                handleMenuClose();
            }
        }).catch(err => console.log(err))
        setAnchorEl(null);
    };


    const handleMenuOpen = (event: any, user: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleMenuAction = (action: string, id: string) => {
        switch (action) {
            case 'edit':
                setOpen(true);
                break;
            case 'delete':
                handleRemove(id);
                break;
            case 'activate':
                status(id, 'activate');
                break;
            case 'deactivate':
                status(id, 'deactivate');
                break;
            case 'remove_company':
                handleCompanyRemove(id);
                break;
            case 'assign_company':
                setDialogOpen(true);
                break;
            case 'change_company':
                setDialogOpen(true);
                break;
        }
    }

    return (
        <div style={{ marginTop: "5rem", border: "1px solid #ccdcd" }}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: "78rem" }} >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left" >Email</TableCell>
                            <TableCell align="left">DOB</TableCell>
                            <TableCell align="left">Designation</TableCell>
                            <TableCell align="left">Active</TableCell>
                            <TableCell align="left">Company</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user: any) => (
                            <>
                                <TableRow
                                    key={user._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        {user.firstName + " " + user.lastName}
                                    </TableCell>
                                    <TableCell align="left" >{user.email}</TableCell>
                                    <TableCell align="left">{user.dob}</TableCell>
                                    <TableCell align="left">{user.designation}</TableCell>
                                    <TableCell align="left">{user.active ? <Chip label="Active" color='success' variant="outlined" /> : <Chip label="InActive" color="error" variant="outlined" />}</TableCell>
                                    <TableCell align="left">{user.company === null ? <Chip label="Not Assigned" color='error' variant="outlined" /> : user.company.companyName}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <Menu
                                    id="menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => handleMenuAction('edit', user)}>Edit</MenuItem>
                                    <MenuItem onClick={() => handleMenuAction('delete', selectedId._id)}>Delete</MenuItem>
                                    {selectedId.active ? <MenuItem onClick={() => handleMenuAction('deactivate', selectedId._id)}>Deactivate</MenuItem> :
                                        <MenuItem onClick={() => handleMenuAction('activate', selectedId._id)}>Activate</MenuItem>
                                    }
                                    {selectedId.company === null ? <MenuItem onClick={() => handleMenuAction('assign_company', selectedId._id)}>Assign Company</MenuItem> :
                                        <>
                                            <MenuItem onClick={() => handleMenuAction('change_company', selectedId._id)}>Change Company</MenuItem>
                                            <MenuItem onClick={() => handleMenuAction('remove_company', selectedId._id)}>Remove Company</MenuItem>
                                        </>

                                    }
                                </Menu>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && (
                <EditModal open={open} setOpen={setOpen} edit={true} editValue={selectedId} setLoader={setLoader} />
            )}
            {dialogOpen && (
                <DialogModal open={dialogOpen} setOpen={setDialogOpen} userId={selectedId._id} setLoader={setLoader} />
            )}
        </div>
    )
}

export default UsersTable;