import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify";
import {TOKEN_NAME} from "./Tokens";
import {API_PATH} from "../Tools/APIS";

const SignIn = (props) => {
    let Login = props.location.pathname;
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");

    const setDataUser = (e) => {
        if (e.target.id === "filled-search") {
            let a = e.target.value;
            setlogin(a)
        } else {
            let a = e.target.value;
            setpassword(a)
        }
    }


    // function loginUser(data, history) {
    //      return function (dispatch) {
    //          dispatch({
    //              type: LOGIN
    //          })
    //          axios.post(API_PATH + "auth/login", data)
    //              .then((res) => {
    //                  console.log(res);
    //                  localStorage.setItem(TOKEN_NAME, res.data.tokenType + " " + res.data.accessToken);
    //                  dispatch({type: LOGIN})
    //                  history.push("/admin")
    //              })
    //              .catch((error) => {
    //                  console.log(error);
    //                  toast.error(error.message)
    //                  dispatch({type: LOGIN})
    //
    //              });
    //      }
    //
    //  }

    const checkUser = () => {

        let authDTO = {
            cardNumber: login,
            password: password
        }
        console.log(authDTO)

        axios.post(`${API_PATH}/api/v1/auth/login`, authDTO)
            .then((res) => {
                console.log(res)
                localStorage.setItem(TOKEN_NAME, res.data.body)
                toast.success(res.data.message)
                props.history.push("/admin")
            })
            .catch((err) => {
                toast.error("Password or Login is incorrect Try again")
                // toast.error(err.message)
            })
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
                        id="filled-search"
                        label="Card Number"
                        type="number"
                        variant="filled"
                        defaultValue={""}
                        onKeyUp={setDataUser}
                    />
                    <TextField
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        // autoComplete="current-password"
                        variant="filled"
                        defaultValue={""}
                        onKeyUp={setDataUser}
                    />

                    <Button
                        disableElevation
                        variant={"contained"}
                        fullWidth
                        style={{margin: "20px 0"}}
                        onClick={() => {
                            checkUser()
                        }}
                    >
                        Login</Button>


                </Box></form>
        </Box>

    );
};

export default SignIn;