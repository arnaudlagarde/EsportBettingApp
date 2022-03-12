
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login/login';
import League from './component/League';
import Match from './component/Match';
import Team from './component/Team';
import Home from './component/Home';

function App() {
    const handleLogout = () => {
        localStorage.clear();
    };
    return (
        <Router>

            <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Login </Link></li>
                <li><Link to={'/home'} className="nav-link"> Home </Link></li>

                <button onClick={handleLogout}>logout</button>
            </ul>

            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path="/div/:game" component={League}></Route>
                <Route path="/:game/leagues/:id" component={Match}></Route>
                <Route path="/:game/team/:id" component={Team}></Route>
            </Switch>
        </Router>
    );
}

export default App;