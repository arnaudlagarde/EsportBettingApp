import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import Login from '../login/login';

class Match extends Component {

    render() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser === null) {
            return (
                <div>
                    <Route exact path="/home">
                        <Redirect to="/"/> : <Login/>
                    </Route>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div>
                            <ul>
                                <Link className={"link-jeux link"} id={this.props.match.params.id}
                                      to={`/${this.props.match.params.game}/past/${this.props.match.params.id}`}>
                                    <button type="button" className="list-group-item list-group-item-action">Past
                                        Match
                                    </button>
                                </Link>
                                <Link className={"link-jeux link"} id={this.props.match.params.id}
                                      to={`/${this.props.match.params.game}/upcoming/${this.props.match.params.id}`}>
                                    <button className="list-group-item list-group-item-action">Upcoming Match</button>
                                </Link>
                                <Link className={"link-jeux link"} id={this.props.match.params.id}
                                      to={`/${this.props.match.params.game}/ongoing/${this.props.match.params.id}`}>
                                    <button className="list-group-item list-group-item-action">Ongoing Match</button>
                                </Link>
                            </ul>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default Match;