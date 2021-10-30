import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";

const Businesses = () => {

    useEffect(()=>{
        axios.get(`${API_PATH}/api/v1/businesses`)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    })
    const [loading,setLoading] = useState(true);

    return (
        <div>
            
        </div>
    );
};

export default Businesses;