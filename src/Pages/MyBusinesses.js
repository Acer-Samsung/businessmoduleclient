import React, {useEffect, useState} from 'react';
import {TOKEN_NAME} from "../Auth/Tokens";
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {
    Box,
    Button,
    CardContent,
    Collapse,
    FormControl, FormGroup, InputLabel, MenuItem,
    Modal, Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {toast} from "react-toastify";

const MyBusinesses = () => {

    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = React.useState(-1);

    function ExpandMoreIcon() {
        return null;
    }

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
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [itemID, setItemID] = useState('');
    const [officeType, setOfficeType] = useState('');
    const handleChange = (event) => {
        setOfficeType(event.target.value);
    };
    let [busdescription, setBusDesc] = useState("");
    const [motto, setMotto] = useState("");

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

    const sendData = (item) => {
        let data = {
            jobTitle: jobTitle,
            description: description,
            salary: salary,
        }

        console.log(item)

        if (isEdit) {
            console.log("is edit true");
            axios.put(`${API_PATH}/api/v1/businesses/my/${itemID}/saveChanges`, data, {headers: {Authorization: AuthStr}})
                .then((res) => {
                    console.log(res)
                    handleClose()
                    setIsEdit(false);
                    // window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message)
                })

        } else {
            console.log("is edit false");

            axios.post(`${API_PATH}/api/v1/vacancies/${item.id}`, data, {headers: {Authorization: AuthStr}})
                .then((res) => {
                    console.log(res)
                    handleClose()
                    // window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }

    const [isEdit, setIsEdit] = useState(false);


    const getBusiness = () => {
        axios.get(`${API_PATH}/api/v1/businesses/my`, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                setBusinesses(res.data.body.content)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

            })
    }

    useEffect(() => {
        getBusiness();
    }, [])

    const setDataUserEdit = (e) => {
        if (e.target.id === "Motto") {
            let a = e.target.value.toString().trim();
            if (a.length < 250) {
                setMotto(a);
            } else {
                toast.error("Word Limit 250")
            }
        } else {
            let a = e.target.value.toString().trim();
            if (a.length < 1000){
                setBusDesc(a);
            }else {
                toast.error("Word Limit 1000")
            }
        }
    }

    const editBusiness = () => {

        let data = {
            form: officeType,
            description: busdescription,
            motto: motto
        }

        axios.put(`${API_PATH}/api/v1/businesses/my/${itemID}/saveChanges`, data, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                handleCloseEdit()
                getBusiness()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

            })
    }

    return (
        <div>
            <Navbar/>

            <Typography variant={"h2"} marginLeft={20}>My Businesses</Typography>

            {
                isEdit ? <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                    <Box sx={style}>

                        <FormGroup>
                            <InputLabel style={{backgroundColor: "#fff", padding: "0 5px 0 0"}}
                                        id="demo-simple-select-label">Company Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="OfficeType"
                                value={officeType}
                                label="Office Type"
                                onChange={handleChange}
                                required={"true"}
                            >
                                <MenuItem value={"SP"}>Sole Proprietorship</MenuItem>
                                <MenuItem value={"CORP"}>Corporation</MenuItem>
                                <MenuItem value={"LLC"}>Limited Liability Company</MenuItem>
                            </Select>
                            <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                                <TextField
                                    style={{margin: "5px 0 20px 0"}}
                                    id="Motto"
                                    label="Motto"
                                    type="text"
                                    variant="filled"
                                    onKeyUp={setDataUserEdit}
                                    required={true}
                                />

                                <TextareaAutosize
                                    style={{margin: "5px 0 20px 0"}}
                                    id="Description"
                                    minRows={10}
                                    placeholder="Description"
                                    onChange={setDataUserEdit}
                                />

                                {/*<TextField*/}
                                {/*    id="OfficeID"*/}
                                {/*    label="Office ID"*/}
                                {/*    type="number"*/}
                                {/*    variant="filled"*/}
                                {/*    onKeyUp={setDataUser}*/}
                                {/*/>*/}
                            </Box>
                            <Button onClick={editBusiness} type={"submit"} variant={"outlined"}>Submit</Button>
                        </FormGroup>
                    </Box>
                </Modal> : ""
            }

            {businesses.map((item, i) => (
                <div style={{
                    width: "80%",
                    marginLeft: "10%",
                    border: "0.5px solid black",
                    borderRadius: "10px",
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
                            <Typography variant={"h5"} fontWeight={600} color={"black"}>
                                {item.name} {item.businessType}
                            </Typography>
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

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Typography
                                color={"black"}>{item.description ? <><span
                                style={{fontWeight: "550"}}>Description:</span> {item.description}</> : ""}
                            </Typography>
                                <Typography
                                    color={"black"}>{item.motto ?
                                    <><span style={{fontWeight: "550"}}>Motto:</span> {item.motto}</> : ""}
                                </Typography>
                                <Typography
                                    color={"black"}><span
                                    style={{fontWeight: "550"}}>Created at:</span> {item.createdAt}
                                </Typography>
                                <Typography
                                    color={"black"}><span style={{fontWeight: "550"}}>Address: </span>{item.address}
                                </Typography>

                            </div>

                            <Box style={{display: "flex", alignItems: "center"}}>
                                <Button variant={"contained"} style={{margin: "10px 0 -10px 0"}} onClick={() => {
                                    handleOpenEdit();
                                    setIsEdit(true)
                                    setItemID(item.id)
                                }}>Edit</Button>

                                <Button onClick={handleOpen}
                                        style={{margin: "10px 0 -10px 10px"}}
                                        variant={"outlined"}>Add Vacancy</Button>
                            </Box>


                        </CardContent>
                    </Collapse>

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
                                <Button onClick={() => sendData(item)} type={"submit"}
                                        variant={"outlined"}>Submit</Button>
                            </FormControl>


                        </Box>
                    </Modal>

                </div>


            ))
            }
        </div>
    );
};

export default MyBusinesses;