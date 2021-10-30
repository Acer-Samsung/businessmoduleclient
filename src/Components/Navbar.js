import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    FormControl,
    InputLabel, MenuItem,
    Modal,
    Select,
    TextField,
    Toolbar,
} from "@mui/material";
import {Link} from "react-router-dom";
import {TOKEN_NAME} from "../Auth/Tokens";
import axios from "axios";
import {toast} from "react-toastify";
import {API_PATH} from "../Tools/APIS";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = (props) => {


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
    const [officeType, setOfficeType] = useState('');
    const handleChange = (event) => {
        setOfficeType(event.target.value);
    };
    let [officeID, setOfficeID] = useState(0);
    const [companyName, setCompanyName] = useState("");
    const AuthStr = 'Bearer '.concat(localStorage.getItem(TOKEN_NAME));

    const setDataUser = (e) => {
        if (e.target.id === "CompanyName") {
            let a = e.target.value;
            setCompanyName(a);
        } else {
            let a = e.target.value;
            setOfficeID(a);
        }
    }
    const handleFormSubmit = () => {
        let data = `${API_PATH}/api/v1/businesses/new?name=${companyName}&homeId=${officeID}&type=${officeType}`;
        axios.post(data, null, {headers: {Authorization: AuthStr}})
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1000)

            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <AppBar style={{zIndex: "200"}} position={"static"}>
            <Toolbar>
                <Box width={"100%"} style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                    <Box style={{width: "450px", display: "flex", justifyContent: "space-between",alignItems:"center"}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={"/businesses"}>Businesses</Link>
                        {
                            localStorage.getItem(TOKEN_NAME) ? <Link style={{textDecoration: "none", color: "white"}}
                                                                     to={"/vacancies"}>Vacancies</Link> : ""
                        }
                        {
                            localStorage.getItem(TOKEN_NAME) ?
                                <>
                                    {props.role === "ROLE_CITIZEN" ?
                                        <Link style={{textDecoration: "none", color: "white"}}
                                              to={"/notifications"}>Notification</Link> : ""
                                    }
                                </>
                                : ""

                        }
                    </Box>
                    <Box style={{width: "350px", display: "flex", justifyContent: "space-between",alignItems:"center"}}>


                        {
                            localStorage.getItem(TOKEN_NAME) ?
                                <>
                                    <Link style={{textDecoration: "none", color: "white"}}
                                          to={"/admin"}><AccountCircleIcon/></Link>

                                    <Button color={"success"} variant={"contained"} style={{width:"169px"}} onClick={handleOpen}>
                                        <b style={{color:"#fff",fontWeight:"normal"}}>
                                            Create
                                            Business
                                        </b>
                                    </Button>


                                    <Button color={"error"} style={{width:"100px"}} variant={"contained"}> <Link
                                        style={{textDecoration: "none", color: "white"}}
                                        onClick={() => {
                                            localStorage.removeItem(TOKEN_NAME)
                                        }} to={"/"}>Log Out</Link></Button>

                                </>
                                : <>
                                    <Link style={{textDecoration: "none", color: "white"}} to={"/SignIn"}>Sign In</Link>
                                    <Link style={{textDecoration: "none", color: "white"}} to={"/SignUp"}>Sign Up</Link>
                                </>
                        }
                    </Box>
                </Box>


            </Toolbar>
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
                                id="CompanyName"
                                label="Company Name"
                                type="text"
                                variant="filled"
                                onKeyUp={setDataUser}
                            />
                            <TextField
                                id="OfficeID"
                                label="Office ID"
                                type="number"
                                variant="filled"
                                onKeyUp={setDataUser}
                            />
                        </Box>
                        <Button onClick={handleFormSubmit} type={"submit"} variant={"outlined"}>Submit</Button>
                    </FormControl>


                </Box>
            </Modal>
        </AppBar>
    );
};

export default Navbar;