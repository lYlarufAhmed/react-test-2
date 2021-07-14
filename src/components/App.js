import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ItemList from "./ItemList";
import Navbar from "./Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebaseProvider";
import AddProductForm from "./AddProductForm.";

function App() {
    const [user] = useAuthState(auth)
    return (
        user ?
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path={'/'} component={AddProductForm}/>
                <Route path={'/category/:categoryName'} component={ItemList}/>
            </Switch>
        </Router>:
            <Router>
                <Route exact path={'/'} component={Login}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
            </Router>
    );
}

export default App;
