import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InventoryList from "./InventoryList";
import Login from "./Login";
import SignUp from "./SignUp";
import ItemList from "./ItemList";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={InventoryList}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/category/:categoryName'} component={ItemList}/>
            </Switch>
        </Router>
    );
}

export default App;
