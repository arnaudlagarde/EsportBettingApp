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
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/matches/running?filter[league_id]=' + this.props.match.params.id + '&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            matchs: data
        })
    }

    render() {
        if (this.state.matchs.length === 0) {
            return (
                <div id='flex'>
                    <p>There isn't any ongoing match for this league.</p>
                </div>
            )
        } else {
            return (
                <div className="shadow" id='text-centered'>
                    {this.state.matchs.map(match =>
                        <div className={"match"}>
                            <p className={"title-match"}>{match.name}</p>
                            {match.opponents.map(opponent =>
                                <Link key={opponent.opponent.id} game={this.props.match.params.game}
                                      to={`/${this.props.match.params.game}/team/${opponent.opponent.id}`}>
                                    <img id={"img-team"} src={opponent.opponent.image_url} alt={"Team"}/>
                                </Link>
                            )}
                            {match.winner != null &&
                                <p className={"vainqueur"}>Winner : {match.winner.name}</p>
                            }
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default Match;