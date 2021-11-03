import {Switch, Route, Redirect} from "react-router-dom";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Passbook from "../components/Passbook";
import Authentication2 from "../components/Authentication2.jsx";
import { useContext } from "react";
import { DataContext } from "../context/DataContextProvider.jsx";

function Routes(){

    const{auth} = useContext(DataContext)

    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
            <Route exact path="/passbook">
                {
                    auth ? <Passbook/> : <Redirect to="/auth" />
                }
            </Route>
            {/* <Route exact path="/auth">
                <Authentication/>
            </Route> */}
            <Route exact path="/auth">
                <Authentication2/>
            </Route>
        </Switch>
    )
}

export default Routes;
