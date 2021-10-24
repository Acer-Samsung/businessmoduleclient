import React, {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
import axios from "axios";
import {TOKEN_NAME} from "../Auth/Tokens";
import {API_PATH} from "../Tools/APIS";

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
    }, [AuthStr])

    return (
        <div>
            <Navbar role={role}/>
        </div>
    );
};

export default Admin;