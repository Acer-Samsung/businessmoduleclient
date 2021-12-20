import React, {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
import axios from "axios";
import {TOKEN_NAME} from "../Auth/Tokens";
import {API_PATH} from "../Tools/APIS";
import {CircularProgress, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";

const Admin = () => {

    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    let [role, setRole] = useState("");

    const [userInfo,setUserInfo] = useState({});

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
            .finally(() => {
                setLoading(false)
            })

        axios.get(`${API_PATH}/api/v1/users/me`,{headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                setUserInfo(res.data.body)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [AuthStr])

    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Navbar role={role}/>
            <div style={{
                margin: "0 auto",
                background: "#e9ebef",
                width: "80vw",
                height: "90vh",
                outline: "none",
                zIndex: "-10",
                marginTop: "2px"
            }}>

                {loading ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center",height:"70vh"}}><CircularProgress size={75} /></div> : <div style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    flexDirection: "column"
                }}>
                    <Typography variant={"h2"} fontWeight={600}>User Details</Typography>
                    <div style={{textAlign:"start",margin:"30px 0 0 0"}}>
                        <Typography variant={"h2"}>First name: {userInfo.firstName}</Typography>
                        <Typography variant={"h2"}>Last name:{userInfo.lastName}</Typography>
                        <Typography variant={"h2"}>Birth date: {userInfo.birthDate}</Typography>
                        <Typography variant={"h2"}>Gender: {userInfo.gender}</Typography>
                        <Typography variant={"h2"}>Marital Status: {userInfo.maritalStatus}</Typography>
                        <Typography variant={"h2"}>{userInfo.employer ? <span><span style={{fontWeight:"bold"}}>Employer:</span>{userInfo.employer.name}</span> : ""}</Typography>
                        {role === "ROLE_BUSINESS_OWNER" ? <Link style={{textDecoration:"none",color:"blue"}} to={"/mybusinesses"}>Click to see your businesses</Link> : ""}
                    </div>

                </div>}



            </div>


        </div>
    );
};

export default Admin;