import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './login/login';
import League from './component/League';
import Match from './component/Match';
import Team from './component/Team';
import Home from './component/Home';
import PastMatch from './component/PastMatch';
import UpcomingMatch from './component/UpcomingMatch';
import OngoingMatch from './component/OngoingMatch';
import Bet from './component/Bet';
import Register from './component/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <Router>

            <div className="topnav" id="myTopnav">
                <Link to={'/home'}>
                    Home
                </Link>
                <Link to={'/bet'} className="nav-link">
                    My Bets
                </Link>
                <Link className="nav-link" onClick={handleLogout}>Logout
                </Link>
            </div>

            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path='/bet'>
                    <Bet />
                </Route>
                <Route path="/div/:game" component={League}/>
                <Route path="/:game/leagues/:id" component={Match}/>
                <Route path="/:game/past/:id" component={PastMatch}/>
                <Route path="/:game/upcoming/:id" component={UpcomingMatch}/>
                <Route path="/:game/ongoing/:id" component={OngoingMatch}/>
                <Route path="/:game/team/:id" component={Team}/>
            </Switch>
        </Router>
    );

}

export default App;
