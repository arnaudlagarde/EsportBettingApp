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
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/matches?filter[league_id]=' + this.props.match.params.id + '&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
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
                <div className="shadow">

                    <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id}
                          to={`/${this.props.match.params.game}/past/${this.props.match.params.id}`}>
                        <button class="jeux">Past Match</button>
                    </Link>

                    <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id}
                          to={`/${this.props.match.params.game}/upcoming/${this.props.match.params.id}`}>
                        <button class="jeux">Upcoming Match</button>
                    </Link>

                    <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id}
                          to={`/${this.props.match.params.game}/ongoing/${this.props.match.params.id}`}>
                        <button class="jeux">Ongoing Match</button>
                    </Link>

                </div>
            )
        }
    }
}

export default Match;