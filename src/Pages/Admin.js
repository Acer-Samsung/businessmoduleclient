import React, {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
import axios from "axios";
import {TOKEN_NAME} from "../Auth/Tokens";
import {API_PATH} from "../Tools/APIS";
import {CircularProgress, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Admin = () => {

    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    let [role,setRole] = useState("");

    useEffect(() => {

        axios.get(`${API_PATH}/api/v1/users`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                role = res.data.body.role;
                setRole(role);
                console.log(role)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [AuthStr])

    const [loading,setLoading] = useState(true);

    return (
        <div>
            <Navbar role={role}/>

            {/*{*/}
            {/*    loading ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center",height:"70vh"}}><CircularProgress size={75} /></div> : ""*/}
            {/*}*/}
            <div style={{margin:"0 auto",background:"#e9ebef",width:"80vw",height:"90vh",outline:"none",zIndex:"-10",marginTop:"2px"}}>

                <div style={{padding:"20px",display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
                    <AccountCircleIcon style={{fontSize:"100px"}}/>
                    <Typography variant={"h2"}>firstname</Typography>
                    <Typography variant={"h2"}>lastname</Typography>
                    <Typography variant={"h3"}>birthdate</Typography>
                    <Typography variant={"h3"}>employer</Typography>
                </div>

            </div>


        </div>
    );
};

export default Admin;