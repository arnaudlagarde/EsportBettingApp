import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/matches/past?filter[league_id]=' + this.props.match.params.id + '&token=SVQRh-y62CqIltlLkP4OKuIOYTQ0xzyIjL8Rh0H9yRPFLaaSCm4');
        const data = await response.json();
        this.setState({
            matchs: data

        })
    }

    render() {
        if (this.state.matchs.length === 0) {
            return (
                <div id='flex'>
                    <p>There isn't any match for this particular league.</p>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.matchs.map(match =>
                        <div id='text-centered'>
                            <div className={"match"}>
                                <p className={"title-match"}>{match.name}</p>
                                {match.opponents.map(opponent =>
                                    <Link key={opponent.opponent.id} game={this.props.match.params.game}
                                          to={`/${this.props.match.params.game}/team/${opponent.opponent.id}`}>
                                        <img id={"img-team"} src={opponent.opponent.image_url}/>
                                    </Link>
                                )}
                                {match.winner != null &&
                                    <p className={"vainqueur"}>Winner : <b>{match.winner.name}</b></p>
                                }
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default Match;