import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class League extends Component{

    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/rl/leagues?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            leagues: data

        })
    }

    render() {
        return(
            <div>
                {this.state.leagues.map(league =>
                    <Link key={league.id} to={`/leagues/${league.id}`}>
                        <img src={league.image_url}></img>
                        <p>{league.name}</p>
                    </Link>
                )}
            </div>
        )
    }
}

export default League;