import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Login from '../login/login';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/teams?filter[id]=' + this.props.match.params.id + '&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            teams: data

        })
    }

    render() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            return (
                <Route exact path="/home">
                    <Redirect to="/"/> : <Login/>
                </Route>
            );
        } else {
            return (
                <div>

                    {this.state.teams.map(team =>
                        <div style={{"text-align": "center"}}>
                            <div style={{"text-align": "center", "margin-bottom": "30px"}}>
                                <p>{team.name} {team.acronym}</p>
                                <img src={team.image_url} alt={'Team Image'}/>
                            </div>

                            {team.players.map(player =>
                                <div className="leagues" style={{"text-align": "center"}}>
                                    <img src={player.image_url} alt={'Player'}/>
                                    <p>{player.name}</p>
                                    <p>Nationality : {player.nationality}</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )
        }
    }
}

export default Team;