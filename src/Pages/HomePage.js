import React, {useEffect} from 'react';
import Navbar from "../Components/Navbar";
import Main from "../Components/Main";
import {TOKEN_NAME} from "../Auth/Tokens";

const HomePage = () => {

    useEffect(()=>{
            localStorage.removeItem(TOKEN_NAME)
    })

    return (
        <div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <Navbar/>
            </div>
            <Main/>
        </div>
    );
};

export default HomePage;