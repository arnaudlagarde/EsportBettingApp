import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Login from '../login/login';

class Bet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bets: [],
            coins: 0,
            matchs: [],
        }
    }

    async componentDidMount() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            window.location = "http://localhost:3000/";
        } else {

            const response2 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"));
            const data2 = await response2.json();

            const match = [];
            for (let i = 0; i < data2.bet.length; i++) {
                const response = await fetch('https://api.pandascore.co/' + data2.bet[i].game + '/matches?filter[id]=' + data2.bet[i].id_match + '&token=SVQRh-y62CqIltlLkP4OKuIOYTQ0xzyIjL8Rh0H9yRPFLaaSCm4');
                const data = await response.json();

                match.push(data);
            }

            this.setState({
                matchs: match,
                bets: data2.bet,
                coins: data2.coin,
            })
        }
    }

    render() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            return (
                <div>
                    <Route exact path="/home">
                        <Redirect to="/"/> : <Login/>
                    </Route>
                </div>
            );
        } else {
            if (this.state.bets.length === 0) {
                return (
                    <div id='flex'>
                        <p>You haven't made any bet yet.</p>
                    </div>
                )
            } else {
                return (
                    <div>

                        <div style={{"text-align": "center", "margin": "50px 0"}}>
                            <p>My coins : {this.state.coins}</p>
                        </div>

                        {this.state.bets.map((bet, index) =>
                            <div className="shadow" id='text-centered'>
                                <div>
                                    {this.state.matchs[index][0].opponents.map(opponent =>
                                        <img src={opponent.opponent.image_url} alt={'Opponent'}/>
                                    )}
                                </div>

                                <p>You bet {bet.mise} coins on the victory of {bet.name}</p>
                                {this.state.matchs[index][0].winner === null ?
                                    <p>This match hasn't been played yet.</p> :
                                    <p>Winner of the match : {this.state.matchs[index][0].winner.acronym}</p>}
                            </div>
                        )}
                    </div>
                )
            }
        }
    }
}

export default Bet;