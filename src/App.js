import HomePage from "./Pages/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./Auth/SignIn";
import {ToastContainer} from "react-toastify";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./Auth/PrivateRoute";
import Admin from "./Pages/Admin";
import ErrorPage from "./Components/ErrorPage";
import SignUp from "./Auth/SignUp";
import Vacancies from "./Pages/Vacancies";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>
                    <Route exact path={"/SignIn"} component={SignIn}/>
                    <Route exact path={"/SignUp"} component={SignUp}/>
                    <Route exact path={"/vacancies"} component={Vacancies}/>
                    <PrivateRoute exact path={"/admin"} component={Admin}/>
                    <Route component={ErrorPage}/>


                </Switch>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
