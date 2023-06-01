import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemButton, FormControlLabel, Checkbox, DialogActions, Button } from '@mui/material';

import { config } from '../../../utility/config';
import axios from 'axios';

function DialogModal({ open, setOpen,userId,setLoader }: any) {

    const [companyList, setCompanyList] = useState([]);
    const [companyId,setCompanyId] = useState<string>("");


    useEffect(() => {
        axios.get(`${config.url}/company`).then((data) => setCompanyList(data.data.data)).catch((err) => console.log(err))
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        axios.put(`${config.url}/user/company/add/${userId}`, {
            companyId
        }).then((data) => {
            if (data) {
                setLoader(true)
                handleClose()
            }
        }).catch(err => console.log(err))
    }



    return (
        <div>
            <Dialog onClose={handleClose} open={open} >
                <DialogTitle>Link to Company</DialogTitle>
                <List>
                    {companyList.map((item: any) => (
                        <ListItem>
                            <FormControlLabel control={<Checkbox onClick={()=>setCompanyId(item._id)}/>} label={item.companyName} />
                        </ListItem>
                    ))}
                </List>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default DialogModal;