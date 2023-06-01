
import { useState, useEffect } from 'react';

import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Chip,
    IconButton, Menu, MenuItem,Button
} from '@mui/material';


import { makeStyles } from '@mui/styles';


import EditModal from './EditModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import axios from 'axios';
import { config } from '../../../utility/config';
import CompanyDetails from '../CompanyDetails';


const drawerWidth = 600;


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    mapContainer: {
        height: "100%",
        width: "100%"
    }
}));

function CompanyTable({companyList,setLoader}:any){

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId,setSelectedId] = useState({});
    const [openDrawer,setOpenDrawer] = useState<Boolean>(false)


    useEffect(()=>{

    },[])

    const handleMenuOpen = (event: any, company: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(company);
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = (key: String) => {
        axios.get(`${config.url}/company/delete/${key}`).then((data) => {
            if (data) {
                setLoader(true)
            }
        }).catch(err => console.log(err))
    }

    const handleMenuAction = (action: string, id: any) => {
        switch (action) {
            case 'edit':
                setOpen(true);
                break;
            case 'delete':
                handleDelete(id._id);
                break;
            case 'activate':
                // status(id, 'activate');
                break;
            case 'deactivate':
                // status(id, 'deactivate');
                break;
            case 'remove_company':
                // handleCompanyRemove(id);
                break;
            case 'assign_company':
                // setDialogOpen(true);
                break;
            case 'change_company':
                // setDialogOpen(true);
                break;
        }
    }

    return(
        <div style={{ marginTop: "5rem", border: "1px solid #ccdcd" }}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: "78rem" }} >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left" >Address</TableCell>
                            <TableCell align="left" >Map</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companyList.map((company: any) => (
                            <>
                                <TableRow
                                    key={company._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        {company.companyName}
                                    </TableCell>
                                    <TableCell align="left" >{company.companyAddress}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={()=>setOpenDrawer(true)}>View Map</Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={(e)=>handleMenuOpen(e,company)}>
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
                                    <MenuItem onClick={()=>handleMenuAction('edit',company)}>Edit</MenuItem>
                                    <MenuItem onClick={()=>handleMenuAction('delete',company)}>Delete</MenuItem>
                                </Menu>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && (
                <EditModal open={open} setOpen={setOpen} edit={true} editValue={selectedId} setLoader={setLoader} />
            )}
            {/* {dialogOpen && (
                <DialogModal open={dialogOpen} setOpen={setDialogOpen} userId={selectedId._id} setLoader={setLoader} />
            )} */}
            {openDrawer && <CompanyDetails openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} companyDetail={selectedId}/>}
        </div>
    )
}

export default CompanyTable;