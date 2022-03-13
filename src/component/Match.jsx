import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import Login from '../login/login';

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/matches?filter[league_id]=' + this.props.match.params.id + '&token=SVQRh-y62CqIltlLkP4OKuIOYTQ0xzyIjL8Rh0H9yRPFLaaSCm4');
        const data = await response.json();
        this.setState({
            matches: data

        })
    }

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
                                <Link class={"lien-jeux lien"} id={this.props.match.params.id}
                                      to={`/${this.props.match.params.game}/past/${this.props.match.params.id}`}>
                                    <button type="button" className="list-group-item list-group-item-action">Past
                                        Match
                                    </button>
                                </Link>
                                <Link class={"lien-jeux lien"} id={this.props.match.params.id}
                                      to={`/${this.props.match.params.game}/upcoming/${this.props.match.params.id}`}>
                                    <button className="list-group-item list-group-item-action">Upcoming Match</button>
                                </Link>
                                <Link class={"lien-jeux lien"} id={this.props.match.params.id}
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