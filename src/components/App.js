import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InventoryList from "./InventoryList";
import Login from "./Login";
import SignUp from "./SignUp";
import ItemList from "./ItemList";
import Navbar from "./Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebaseProvider";

function App() {
    const [user] = useAuthState(auth)
    return (
        user ?
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path={'/'} component={InventoryList}/>
                <Route path={'/category/:categoryName'} component={ItemList}/>
            </Switch>
        </Router>:
            <Router>
                <Router exct path={'/'} component={Login}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
            </Router>
    );
}

export default App;
