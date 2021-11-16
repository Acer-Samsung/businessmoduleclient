import React, {useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {toast} from "react-toastify";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const SignUp = (props) => {
    let Login = props.location.pathname;
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true)
    const [isError, setIsError] = useState(true)

    const setDataUser = (e) => {
        if (e.target.id === "filled-search") {
            let a = e.target.value;
            setlogin(a)
        } else {
            if (document.getElementById("confirm").value === document.getElementById("password").value && !isError) {
                let a = e.target.value;
                setpassword(a)
                setIsDisabled(!isDisabled);
            } else {
                setIsDisabled(true)
            }
        }
    }

    const checkUser = () => {

        let authDTO = {
            cardNumber: login,
            password: password
        }
        console.log(authDTO)

        axios.post(`${API_PATH}/api/v1/auth/register`, authDTO)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                props.history.push("/SignIn");
                // props.history.push("/SignIn")
            })
            .catch((err) => {
                // toast.error("Password or Login is incorrect Try again")
                toast.error(err.message)
            })
    }


    const handleOnChange = (e) => {
        console.log(e.target.value.length)
        return e.target.value.length === 8 ? setIsError(false) : setIsError(true);
    }

    return (
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form style={{width: "100%", display: 'flex', justifyContent: "center"}}>
                <Box width={"20%"} display={"flex"} flexDirection={"column"}>

                    <Typography variant={"h3"} textAlign={"center"} style={{
                        marginBottom: "30px",
                        marginTop: "170px"
                    }}>{Login.split("/")[1] === "SignIn" ? "Sign In" : "Sign Up"}
                    </Typography>

                    <TextField
                        error={isError}
                        id="filled-search"
                        label="Card Number"
                        type="number"
                        variant="filled"
                        defaultValue={"11111115"}
                        placeholder={"max 8 digits"}
                        onChange={(e) => {
                            handleOnChange(e);
                            setDataUser(e)
                        }}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        // autoComplete="no"
                        variant="filled"
                        defaultValue={""}
                        onKeyUp={setDataUser}
                    />
                    <TextField
                        id="confirm"
                        label="Confirm Password"
                        type="password"
                        // autoComplete="no"
                        variant="filled"
                        defaultValue={""}
                        onKeyUp={setDataUser}
                    />

                    <Button
                        disableElevation
                        variant={"contained"}
                        fullWidth
                        style={{margin: "20px 0"}}
                        disabled={isDisabled}
                        onClick={() => {
                            checkUser()
                        }}
                    >
                        Sign Up</Button>
                    <Link style={{textDecoration: "none", color: "black", textAlign: "center"}} to={"/SignIn"}>Have an
                        account? <br/> <span style={{color: "blue"}}>Sign In here</span></Link>

                </Box></form>
        </Box>

    );
};

export default SignUp;