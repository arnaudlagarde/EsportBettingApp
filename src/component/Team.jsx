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
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/teams?filter[id]=' + this.props.match.params.id + '&token=SVQRh-y62CqIltlLkP4OKuIOYTQ0xzyIjL8Rh0H9yRPFLaaSCm4');
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
                        <div id='text-centered'>
                            <div id='text-centered'>
                                <p>{team.name}</p>
                                <img src={team.image_url} alt={'Team'}/>
                            </div>

                            {team.players.map(player =>
                                <div className="leagues" id='text-centered'>
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