import React, {useEffect, useState} from 'react';
import {TOKEN_NAME} from "../Auth/Tokens";
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {
    Box,
    Button,
    CardContent,
    Collapse,
    FormControl, InputLabel, MenuItem,
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [itemID, setItemID] = useState('');
    const [officeType, setOfficeType] = useState('');
    const handleChange = (event) => {
        setOfficeType(event.target.value);
    };
    let [officeID, setOfficeID] = useState(0);
    const [companyName, setCompanyName] = useState("");

    const setDataUser = (e) => {
        if (e.target.id === "Description") {
            let a = e.target.value;
            setCompanyName(a);
        } else {
            let a = e.target.value;
            setOfficeID(a);
        }
    }

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
        getBusiness()
    }, [])

    const editBusiness = () => {

        let data = {
            form: officeType,
            description: companyName,
            motto: officeID
        }

        axios.put(`${API_PATH}/api/v1/businesses/my/${itemID}/saveChanges`, data, {headers: {Authorization: AuthStr}})
            .then((res)=>{
                console.log(res)
                handleClose()
                getBusiness()
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{

            })

    }

    return (
        <div>
            <Navbar/>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>

                    <FormControl fullWidth>
                        <InputLabel style={{backgroundColor: "#fff", padding: "0 5px 0 0"}}
                                    id="demo-simple-select-label">Company Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="OfficeType"
                            value={officeType}
                            label="Office Type"
                            onChange={handleChange}
                        >
                            <MenuItem value={"SP"}>Sole Proprietorship</MenuItem>
                            <MenuItem value={"CORP"}>Corporation</MenuItem>
                            <MenuItem value={"LLC"}>Limited Liability Company</MenuItem>
                        </Select>
                        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                            <TextField
                                id="Description"
                                label="Description"
                                type="text"
                                variant="filled"
                                onKeyUp={setDataUser}
                            />
                            <TextField
                                id="Motto"
                                label="Motto"
                                type="text"
                                variant="filled"
                                onKeyUp={setDataUser}
                            />
                        </Box>
                        <Button type={"submit"} onClick={() => {
                            editBusiness()
                        }} variant={"outlined"}>Edit</Button>
                    </FormControl>


                </Box>
            </Modal>

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
                                    color={"black"}><span
                                    style={{fontWeight: "550"}}>Created at:</span> {item.createdAt}
                                </Typography>
                                <Typography
                                    color={"black"}><span style={{fontWeight: "550"}}>Address: </span>{item.address}
                                </Typography>
                                <Typography
                                    color={"black"}>{item.description ? <><span style={{fontWeight: "550"}}>Description:</span> {item.description}</> : ""}
                                </Typography>
                                <Typography
                                    color={"black"}>{item.motto ?
                                    <><span style={{fontWeight: "550"}}>Motto:</span> {item.motto}</> : ""}
                                </Typography>
                            </div>
                            <Button variant={"contained"} style={{margin: "10px 0 -10px 0"}} onClick={() => {
                                handleOpen();
                                setItemID(item.id)
                            }}>Edit</Button>


                        </CardContent>
                    </Collapse>
                </div>
            ))
            }
        </div>
    );
};

export default MyBusinesses;