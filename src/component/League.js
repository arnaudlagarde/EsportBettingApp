import React, {Component, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

class League extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/leagues?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            leagues: data

        })
    }

    render() {
        return (
            <div>
                {this.state.leagues.map(league =>
                    <Link key={league.id} game={this.props.match.params.game}
                          to={`/${this.props.match.params.game}/leagues/${league.id}`}>
                        <img src={league.image_url}></img>
                        <p>{league.name}</p>
                    </Link>
                )}
            </div>
        )
    }
}

export default League;