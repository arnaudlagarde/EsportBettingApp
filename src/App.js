import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login/login';
import Ligue from './component/League';
import Match from './component/Match';
import Team from './component/Team';
import Home from './component/Home';


function App() {
  return (
      <Router>
          <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Login </Link></li>
              <li><Link to={'/home'} className="nav-link"> Home </Link></li>
          </ul>

          <Switch>
              <Route exact path='/'>

              </Route>
              <Route exact path='/home'>
                  <Home />
              </Route>
              <Route path='/:id/leagues'>
                  <Ligue />
              </Route>
              <Route path="/leagues/:id" component={Match}></Route>
              <Route path="/team/:id" component={Team}></Route>
          </Switch>

      </Router>
  );
}

export default App;
