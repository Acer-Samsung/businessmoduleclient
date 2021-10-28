import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {TOKEN_NAME} from "../Auth/Tokens";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import Navbar from "./Navbar";

const Applicants = (props) => {

    var reg = /\d+/;
    let pathname = props.location.pathname.toString().match(reg);
    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    const [resumes, setResumes] = useState([]);
    const [inform, setInform] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getApplicants = (vacancyId) => {
        axios.get(`${API_PATH}/api/v1/vacancies/myVacancies/${vacancyId}`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                setResumes(res.data.body.applicantResume)
                setInform(res.data.body)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getApplicants(pathname)
    }, [])

    // let [downloadLink, setDonwloadLink] = useState(""); //DOWNLOAD ga aloqasi bor

    // const downloadResume = (resumeId) => {
    //     axios.get(`${API_PATH}/api/v1/resume/${resumeId}`, {headers: {Authorization: AuthStr}})
    //         .then((res) => {
    //             downloadLink = encodeURIComponent(res.data);
    //             setDonwloadLink(downloadLink)
    //             fileDownload(downloadLink,"resume.pdf","pdf")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '0.2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // const DownloadFile = (resumeId) => { //BUNI HAM DOWNLOAD ga aloqasi
    //     let url = `${API_PATH}/api/v1/resume/${resumeId}`;
    //     return axios.get(url, {headers: {Authorization: AuthStr}}).then((response) => {
    //         return response;
    //     })
    // };

    const getPdf = (resumeId) => {
        // const url = BASE_URL + 'excel/productCountByWarehouse'
        const url = `${API_PATH}/api/v1/resume/${resumeId}`;
        const link = document.createElement('a');
        link.href = url;
        // console.log(new Date(), "DATE")
        link.setAttribute('download', "some.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
    }

    const accepted = (resumeId, vacancyId) => {
        axios.post(`${API_PATH}/api/v1/notifications/${vacancyId}/${resumeId}/status?accepted=true`, null, {headers: {Authorization: AuthStr}})
            .then((res) => {
                toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const declined = (resumeId, vacancyId) => {
        axios.post(`${API_PATH}/api/v1/notifications/${vacancyId}/${resumeId}/status?accepted=false`, null, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                // toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Navbar/>


            <ul style={{width: "90%", margin: "0 auto",marginTop:"50px"}}>
                <h2>Applicants</h2>
                {
                    resumes.map((item, index) => (
                        <li style={{
                            listStyle: "none",
                            border: "1px solid #000",
                            padding: "5px",
                            boxSizing: "border-box",
                            margin: "5px 0",
                            display:"flex",
                            justifyContent:"center",
                            borderRadius:"10px"
                        }} key={index}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "80%",
                                alignItems: "center"
                            }}><h4>{item.owner.firstName} {item.owner.lastName} ({inform.jobTitle})</h4>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "400px",
                                    height: "30px"
                                }}><Button variant={"contained"}
                                           onClick={() => {
                                               getPdf(item.id);
                                           }}
                                           color={"info"}>
                                    Download</Button>

                                    <Button variant={"contained"} color={"success"} onClick={() => {
                                        accepted(item.id, inform.id)
                                    }}>Offer</Button>
                                    <Button variant={"contained"} color={"warning"} onClick={() => {
                                        declined(item.id, inform.id)
                                    }}>Decline</Button>
                                </div>
                            </div>
                        </li>
                    ))
                }

                {/*<Modal open={open} onClose={() => {*/}
                {/*    handleClose();*/}
                {/*}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">*/}
                {/*    <Box sx={style}>*/}
                {/*        <div style={{*/}
                {/*            display: "flex",*/}
                {/*            justifyContent: "space-between",*/}
                {/*            width: "400px",*/}
                {/*            height: "30px"*/}
                {/*            // eslint-disable-next-line react/jsx-no-target-blank*/}
                {/*        }}><Button variant={"contained"} color={"info"}>Yes</Button>*/}
                {/*            <Button variant={"contained"} onClick={() => {*/}
                {/*                handleClose()*/}
                {/*            }} color={"success"}>No</Button>*/}
                {/*        </div>*/}
                {/*    </Box>*/}
                {/*</Modal>*/}

            </ul>
        </div>
    );
};

export default Applicants;