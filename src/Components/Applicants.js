import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {TOKEN_NAME} from "../Auth/Tokens";
import {Button} from "@mui/material";

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
                console.log(res.data.body)
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

    return (
        <ul>
            {
                resumes.map((item, index) => (
                    <li style={{listDecoration: "none"}} key={index}>
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
                                    // downloadResume(item.id);
                                    getPdf(item.id);
                                    // handleOpen()
                                }}

                                // onClick={() => {
                                //     DownloadFile(item.id).then(
                                //         (response) => {
                                //             fileDownload(encodeURIComponent(response.data));
                                //             console.log(response)
                                //         }
                                //         , (error) => {
                                //             console.log(error)
                                //         });
                                // }}

                                       color={"info"}>
                                Download</Button><Button variant={"contained"} color={"success"}>Offer</Button><Button
                                variant={"contained"} color={"warning"}>Decline</Button></div>
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
    );
};

export default Applicants;