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
        const response = await fetch('https://api.pandascore.co/rl/matchs?filter[league_id]=' + this.props.match.params.id + '&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            matchs: data

        })
    }

    render() {
        return (
            <div>

                {this.state.matchs.map(match =>
                    <div style={{border: '1px solid black'}}>
                        <p>{match.name}</p>

                        {match.opponents.map(opponent =>
                            <Link key={opponent.opponent.id} game={this.props.match.params.game}
                                  to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                                <img src={opponent.opponent.image_url}></img>
                            </Link>
                        )}

                        {match.winner != null &&
                            <p>Winner : {match.winner.name}</p>
                        }


                    </div>
                )}
            </div>
        )
    }
}

export default Match;