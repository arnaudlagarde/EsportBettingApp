import React, {Component} from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
import Login from '../login/login';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
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
            let game = [
                {id: 'csgo', nom: 'Counter Strike Global Offensive'},
                {id: 'r6siege', nom: 'Rainbow Six Siege'},
                {id: 'dota2', nom: 'Dota2'},
                {id: 'lol', nom: 'League of Legends'},
                {id: 'rl', nom: 'Rocket League'}
            ];
            return (
                <div class="container">
                    <div class="row">
                        <div class=" col-12 col-sm-6 col-lg-4">
                            <h6 class="text-muted">List of Games</h6>
                            <ul class="list-group">
                                {game.map(game =>
                                    <Link key={game.id} to={`/div/${game.id}`}>
                                        <button type="button" class="list-group-item list-group-item-action ">{game.nom}</button>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default Home;