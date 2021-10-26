import React, {useEffect} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {TOKEN_NAME} from "../Auth/Tokens";

const Applicants = (props) => {

    var reg = /\d+/;
    let pathname = props.location.pathname.toString().match(reg);
    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getApplicants = (vacancyId) => {
        axios.get(`${API_PATH}/api/v1/vacancies/myVacancies/${vacancyId}/applicants`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getApplicants(pathname)
    }, [getApplicants, pathname])

    return (
        <div>
            <h1>{pathname}</h1>
        </div>
    );
};

export default Applicants;