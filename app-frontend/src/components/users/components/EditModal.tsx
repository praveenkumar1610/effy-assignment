import React, { useState } from 'react';
import {
    Button,
    Modal,
    TextField,
    Theme
} from '@mui/material';

import { makeStyles } from '@mui/styles'

import axios from 'axios';

import { config } from '../../../utility/config';


interface Props {
    open: boolean,
    setOpen: (value: boolean) => void;
    edit: boolean;
    editValue?: any;
}

const useStyles: any = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: "2rem 2rem"
    },
    fieldBox: {
        marginTop: "1rem"
    }
}));


function EditModal({ open, setOpen, edit, editValue }: Props) {
    const classes = useStyles();
    const [user,setUser] = useState( edit ? {
        firstName:editValue.firstName,
        lastName:editValue.lastName,
        email:editValue.email,
        designation:editValue.designation,
        dob:editValue.dob
    }:{
        firstName:"",
        lastName:"",
        email:"",
        designation:"",
        dob:""
    })

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(edit){
            axios.put(`${config.url}/user`, {
                id:editValue._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                designation:user.designation,
                dob:user.dob
            }).then((data) => {
                if (data.status == 200) {
                    handleClose();
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            axios.post(`${config.url}/user/`, {
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                designation:user.designation,
                dob:user.dob
            }).then((data) => {
                if (data.status == 200) {
                    handleClose();
                }
            }).catch((err) => {
                console.log(err)
            })
        }

    };

    return (
        <div style={{width:'100%'}}>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.modalContent}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className={classes.fieldBox}
                            label="First Name"
                            value={user.firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser((user)=>({...user,firstName:(e.target.value)}))}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Last Name"
                            className={classes.fieldBox}
                            value={user.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  setUser((user)=>({...user,lastName:(e.target.value)}))}
                            fullWidth
                            required
                        />
                         <TextField
                            label="Email"
                            className={classes.fieldBox}
                            value={user.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser((user)=>({...user,email:(e.target.value)}))}
                            fullWidth
                            required
                        />
                         <TextField
                            label="Designation"
                            className={classes.fieldBox}
                            value={user.designation}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  setUser((user)=>({...user,designation:(e.target.value)}))}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Date of Birth"
                            className={classes.fieldBox}
                            value={user.dob}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  setUser((user)=>({...user,dob:(e.target.value)}))}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.fieldBox}
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}


export default EditModal;