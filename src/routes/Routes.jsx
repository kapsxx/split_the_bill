import {Switch, Route} from "react-router-dom";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";

function Routes(){
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/about">
                <About/>
            </Route>
        </Switch>
    )
}

export default Routes;
