import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, CardContent, Collapse,
    Container,
    FormControl,
    Modal,
    TextareaAutosize,
    TextField, Typography
} from "@mui/material";
import Navbar from "../Components/Navbar";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {TOKEN_NAME} from "../Auth/Tokens";
import {ExpandMore} from "@mui/icons-material";

function ExpandMoreIcon() {
    return null;
}

const Vacancies = () => {

    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    let [role, setRole] = useState("");
    const [vacancies, setVacancies] = useState([]);
    const [itemID,setItemID]= useState('');

    useEffect(() => {

        axios.get(`${API_PATH}/api/v1/users`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                role = res.data.body.role;
                setRole(role);
                console.log(role)
                if (role === "ROLE_CITIZEN") {
                    axios.get(`${API_PATH}/api/v1/vacancies`)
                        .then((res) => {
                            console.log(res)
                            setVacancies(res.data.body.content);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else if (role === "ROLE_BUSINESS_OWNER") {
                    axios.get(`${API_PATH}/api/v1/vacancies/myVacancies`, {headers: {Authorization: AuthStr}})
                        .then((res) => {
                            console.log(res)
                            setVacancies(res.data.body);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }, [AuthStr])

    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0.2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [jobTitle, setJobTitle] = useState("");
    let [description, setDescription] = useState("");
    let [salary, setSalary] = useState("");


    const setDataFunc = (e) => {
        switch (e.target.id) {
            case "JobTitle": {
                return setJobTitle(e.target.value);
            }
            case "JobDescription": {
                return setDescription(e.target.value);
            }
            case "salary": {
                return setSalary(e.target.value);
            }
        }
    }

    const sendData = () => {
        let data = {
            jobTitle: jobTitle,
            description: description,
            salary: salary,
        }

        if (isEdit) {
            console.log("is edit true");
            axios.put(`${API_PATH}/api/v1/vacancies/myVacancies/${itemID}`, data, {headers: {Authorization: AuthStr}})
                .then((res) => {
                    console.log(res)
                    handleClose()
                    setIsEdit(false);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message)
                })

        } else {
            console.log("is edit false");

            axios.post(`${API_PATH}/api/v1/vacancies`, data, {headers: {Authorization: AuthStr}})
                .then((res) => {
                    console.log(res)
                    handleClose()
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }
    const [file, setFile] = useState({});

    const handleFile = e => {
        setFile({file: e.target.files[0]});
    };

    const [isEdit, setIsEdit] = useState(false);

    const sendResume = (item) => {
        console.log(file)

        console.log(item)

        const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
        const formData = new FormData();
        formData.append('file', file.file)

        axios.post(`${API_PATH}/api/v1/vacancies/${item.id}/apply`, formData, {
            headers: {
                Authorization: AuthStr,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'form/data'
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editVacancy = (itemid) => {
        setItemID(itemid);
        handleOpen()
    }


    return (
        <div>
            <Navbar/>
            <Container style={{marginTop: "30px"}}>
                <Box style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={handleOpen} style={{display: `${role === "ROLE_CITIZEN" ? "none" : "block"}`}}
                            variant={"outlined"}>Add Vacancy</Button>
                </Box>
                <Modal open={open} onClose={() => {
                    handleClose();
                    setIsEdit(false)
                }} aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description">
                    <Box sx={style}>

                        <FormControl fullWidth>
                            <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                                <TextField
                                    id="JobTitle"
                                    label="Job Title"
                                    type="text"
                                    variant="outlined"
                                    onChange={setDataFunc}
                                />

                                <TextareaAutosize
                                    style={{margin: "25px 0 20px 0"}}
                                    id="JobDescription"
                                    minRows={10}
                                    placeholder="Job Description"
                                    onChange={setDataFunc}
                                />

                                <div style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    margin: "0 0 20px 0"
                                }}>
                                    <AttachMoneyIcon color={"action"}/>
                                    <TextField
                                        fullWidth
                                        id="salary"
                                        label="Salary"
                                        type="number"
                                        variant="outlined"
                                        onChange={setDataFunc}
                                    />
                                </div>

                            </Box>
                            <Button onClick={sendData} type={"submit"} variant={"outlined"}>Submit</Button>
                        </FormControl>


                    </Box>
                </Modal>
                {
                    vacancies.map((item, i) => (
                        <div style={{
                            width: "80%",
                            marginLeft: "10%",
                            border: "0.5px solid black",
                            position: "relative",
                            padding: "10px",
                            boxSizing: "border-box",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignContent: "center",
                                alignItems: "center"
                            }}>
                                <div style={{display: 'flex'}}>
                                    <Typography color={"black"}>{item.jobTitle}</Typography>
                                    <Typography style={{marginLeft: "10px"}}
                                                color={"black"}>({item.business.name})</Typography>
                                </div>

                                <ExpandMore
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expandedId === i}
                                    aria-label="show more"
                                ><ExpandMoreIcon/>
                                </ExpandMore>
                            </div>

                            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <p>{item.description}</p>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <div>
                                            <h4>${item.salary}</h4>
                                            <h4>Address: {item.business.address}</h4>
                                        </div>

                                        {
                                            role === "ROLE_CITIZEN" ?
                                                <form id="fileupload" method="post" encType="multipart/form-data">
                                                    <input id="file" onChange={handleFile} accept="application/pdf"
                                                           style={{
                                                               border: "0.2px solid blue",
                                                               borderRadius: "20px",
                                                               padding: "10px",
                                                               boxSizing: "border-box"
                                                           }} type={"file"}/>
                                                </form> : ""
                                        }

                                    </div>

                                    {
                                        role === "ROLE_CITIZEN" ?
                                            <Button onClick={() => sendResume(item)} color={"primary"}
                                                    variant={"outlined"}>Apply</Button> :
                                            <Button color={"primary"} onClick={() => {
                                                editVacancy(item.id);
                                                setIsEdit(true)
                                            }}
                                                    variant={"outlined"}>Edit</Button>
                                    }


                                </CardContent>
                            </Collapse></div>
                    ))
                }
            </Container>
        </div>

    );
};

export default Vacancies;