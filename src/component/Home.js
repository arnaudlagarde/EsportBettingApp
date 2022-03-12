import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../login/login';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentWillMount() {debugger;
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {

        }
    }

    render() {
        const game = [{id: 'csgo', nom: 'CSGO'}, {id: 'lol', nom: 'League of Legends'}];
        return(

            <div>
                {game.map(game =>
                    <Link key={game.id} to={`/div/${game.id}`}>{game.nom}</Link>
                )}

            </div>
        )
    }
}

export default Home;