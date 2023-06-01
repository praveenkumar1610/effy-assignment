import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    TextField,
    Theme,
    Select,
    MenuItem
} from '@mui/material';

import { makeStyles } from '@mui/styles'
import { config } from '../../../utility/config';


import axios from 'axios';


interface Props {
    open: boolean,
    setOpen: (value: boolean) => void;
    edit: boolean;
    editValue?: any;
    setLoader:(value: boolean) => void;
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


function EditModal({ open, setOpen, edit, editValue,setLoader }: Props) {
    const classes = useStyles();
    const [name, setName] = useState(edit ? editValue.companyName : '');
    const [address, setAddress] = useState(edit ? editValue.companyAddress : '');
    const [coordinates, setCoordinates] = useState(edit ? editValue.coordinates.join(",") : '')
    const [dropDownOptions, setDropDownOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geocodeAddress, setGeocodeAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState<any>({})

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setGeocodeAddress([]);
        let active = true;
        (async () => {
            setLoading(true)
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDrTz67WokoLBp40gAPNEGol-B3RJSUukU`
            );
            if (active) {
                console.log(response.data);
                setGeocodeAddress(response.data.results);
                setLoading(false)
            }
        })();
        
    }, [address]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (edit) {
            axios.put(`${config.url}/company`, {
                id: editValue._id,
                companyName: name,
                companyAddress: address,
                companyCoordinates: selectedAddress.length? Array.from(Object.values(selectedAddress.geometry.location)) : coordinates,
            }).then((data) => {
                if (data.status == 200) {
                    setLoader(true)
                    handleClose();
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            axios.post(`${config.url}/company/`, {
                companyName: name,
                companyAddress: address,
                companyCoordinates:Array.from(Object.values(selectedAddress.geometry.location))
            }).then((data) => {
                if (data.status == 200) { 
                    setLoader(true)
                    handleClose();
                }
            }).catch((err) => {
                console.log(err)
            })
        }

    };

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.modalContent}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className={classes.fieldBox}
                            label="Name"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            className={classes.fieldBox}
                            label="Address"
                            value={address}
                            variant='standard'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                            fullWidth
                            required
                        >
                        </TextField>
                        <Select
                            labelId="demo-simple-select-label"
                            value={selectedAddress.formatted_address}
                            label="Address"
                            onChange={(e)=>{setSelectedAddress(e.target.value);console.log(e.target.value)}}
                            sx={{width:500,marginTop:"2rem"}}
                            fullWidth
                            required
                        >
                            {geocodeAddress.map((item: any) => (
                                <MenuItem value={item}>{item.formatted_address}</MenuItem>
                            ))}
                        </Select>
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