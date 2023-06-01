import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import ManageUsers from './components/ManageUsers';

import { Button, FormControl, Typography, Drawer } from "@mui/material";
import EditModal from './components/EditModal';

import CompanyTable from './components/CompanyTable';
import { makeStyles } from '@mui/styles'
import { config } from '../../utility/config';

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

function CompanyDetails({openDrawer,setOpenDrawer,companyDetail}:any) {
    const classes = useStyles();
    const [loader, setLoader] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const navigate = useNavigate();
    const { companyId } = useParams();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.api_key as string,
    });


    const center = useMemo(() => ({ lat: 12.973291, lng: 80.244438 }), []);

    return (
        <>
            <div style={{ width: "100%", height: "100vh", display: 'flex' }}>
                {/* <div style={{ backgroundColor: "#5E53E9", display: 'flex', flexDirection: 'column', justifyContent: 'center', width: "20%", borderRadius: "0.5rem" }}>
                    <Button variant="contained" onClick={() => navigate('/companies')}>Manage Company</Button>
                    <Button variant="contained" style={{ marginTop: "2rem" }} onClick={() => navigate('/users')}>Manage User</Button>
                </div>
                <div style={{ marginLeft: "2rem", width: "100%" }}>
                    <div>
                        <h1>Company</h1>
                    </div>
                    <div style={{ float: "right", marginRight: "10rem" }} >
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setOpen(true)}>
                            Edit
                        </Button>
                    </div>
                    {!loader && (
                        <div style={{ marginTop: "6rem", minWidth: "90%", display: 'flex', justifyContent: "flex-start" }}>
                            <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
                                <div style={{ marginTop: "2rem" }}>
                                    <Typography>Company Name:</Typography>
                                    <Typography>Company Address:</Typography>
                                    <Typography>Company Coordinates:</Typography>
                                </div>
                                <div style={{ marginTop: "2rem" }}>
                                    <FormControl>
                                        <Typography>{companyDetail?.companyName}</Typography>
                                        <Typography>{companyDetail?.companyAddress}</Typography>
                                        <Typography>{companyDetail?.coordinates.join(",")}</Typography>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    )}
                    <div style={{ marginTop: "2rem", marginLeft: "4rem", display: "flex", justifyContent: 'space-between', marginRight: "10rem" }}>
                        <div>
                            <Button variant='contained' onClick={() => setShowUsers(true)}>View Users</Button>
                        </div>
                        <div>
                            <Button variant='contained' onClick={() => setOpenDrawer(true)}>View Map</Button>
                        </div>
                    </div>
                    <div>
                        {showUsers && (
                            <ManageUsers companyId={companyId} />
                        )}
                    </div>
                </div> */}
                {/* {open && (
                    <EditModal open={open} setOpen={setOpen} edit={true} editValue={companyDetail} />
                )} */}
                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="right"
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <GoogleMap
                                mapContainerClassName={classes.mapContainer}
                                center={center}
                                zoom={10}
                            >
                                {!loader && (
                                    <MarkerF position={{ lat: companyDetail?.coordinates[0], lng: companyDetail?.coordinates[1] }}
                                        icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
                                    />
                                )}
                            </GoogleMap>
                        </>
                    )}
                </Drawer>
            </div>
        </>

    )
}

export default CompanyDetails;