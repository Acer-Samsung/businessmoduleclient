import {Route} from "react-router-dom";
import {TOKEN_NAME} from "./Tokens";
import ErrorPage from "../Components/ErrorPage";

const PrivateRoute = (props) => {
    return (
        localStorage.getItem(TOKEN_NAME) ?
            <Route component={props.component} path={props.path} exact={props.exact}/>
            : <Route component={ErrorPage}/>
        // : <Redirect to="/login"/>
    );
};

export default PrivateRoute;