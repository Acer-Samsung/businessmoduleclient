import React from 'react';
import Navbar from "../Components/Navbar";
import Main from "../Components/Main";

const HomePage = () => {
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