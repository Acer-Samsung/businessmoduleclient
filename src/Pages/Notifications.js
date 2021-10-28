import React, {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {TOKEN_NAME} from "../Auth/Tokens";
import {Button, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {toast} from "react-toastify";

const Notifications = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    const [nots, setNots] = useState([]); //Notifications

    const getNotifications = () => {
        axios.get(`${API_PATH}/api/v1/notifications`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                setNots(res.data.body);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`${API_PATH}/api/v1/notifications`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                setNots(res.data.body);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const accept = (businessID,notID) => {

        axios.put(`${API_PATH}/api/v1/businesses/${businessID}/${notID}/offer?status=true`, null, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                getNotifications();
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const reject = (businessID,notID) => {

        axios.put(`${API_PATH}/api/v1/businesses/${businessID}/${notID}/offer?status=false`, null, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                toast.error(res.data.message)
                getNotifications();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Navbar/>
            <div style={{width: "90%", margin: "0 auto", marginTop: "50px"}}>
                <h1>noftications</h1>

                <ul style={{width: "90%", margin: "0 auto", marginTop: "50px"}}>

                    {
                        nots.map((item, index) => (
                            <li style={{
                                listStyle: "none",
                                border: `1px solid ${item.status === "ACCEPTED" ? "green" : "red"}`,
                                boxShadow: `0px 0px 10px ${item.status === "ACCEPTED" ? "green" : "red"}`,
                                padding: "5px",
                                boxSizing: "border-box",
                                margin: "15px 0",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "10px"
                            }} key={index}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "80%",
                                    alignItems: "center"
                                }}><h4>Vacancy: {item.vacancy.jobTitle} <br/> Salary: ${item.vacancy.salary} <br/> Offer
                                    time: {item.createdAt.slice(0, 10)} <br/> Company: {item.vacancy.business.name}</h4>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Typography>Accept:</Typography><Button color={"success"} disabled={item.answered} onClick={() => {
                                        accept(item.vacancy.business.id,item.id);
                                    }}><CheckCircleIcon  style={{fontSize: "50px"}}/></Button></div>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Typography>Reject:</Typography><Button color={"error"} disabled={item.answered} onClick={() => {
                                        reject(item.vacancy.business.id,item.id);
                                    }}><CancelIcon  style={{fontSize: "53px"}}/></Button></div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Notifications;