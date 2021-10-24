import React from 'react';
import errorimg from "../Assets/img/404.jpg"

const ErrorPage = () => {
    return (
        <div style={{overflow: "hidden"}}>
            <img style={{width: "100vw", height: "90vh", marginTop: "9.2vh"}} src={errorimg} alt=""/>
        </div>
    );
};

export default ErrorPage;