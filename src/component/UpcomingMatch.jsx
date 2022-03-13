import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Match extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
            bet: [],
            coin: 0
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/matches/upcoming?filter[league_id]=' + this.props.match.params.id + '&token=SVQRh-y62CqIltlLkP4OKuIOYTQ0xzyIjL8Rh0H9yRPFLaaSCm4');
        const data = await response.json();
        this.setState({
            matchs: data
        })

        const response2 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"));
        const data2 = await response2.json();

        const bet = [];
        for (let z = 0; z < data2.bet.length; z++) {
            bet.push(data2.bet[z].id_match);
        }
        this.setState({
            bet: bet,
            coin: data2.coin
        })
    }

    async handleInputChange(event) {

        const response1 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"));
        const data1 = await response1.json();

        let winner = "";
        let name = "";
        const mise = document.getElementsByClassName(event)[0].children[1].children[0].value;
        if (document.getElementsByClassName(event)[0].children[0].children[0].children[0].checked === true) {
            winner = document.getElementsByClassName(event)[0].children[0].children[0].children[0].id;
        } else {
            winner = document.getElementsByClassName(event)[0].children[0].children[1].children[0].id;
        }

        for (let l = 0; l < this.state.matchs.length; l++) {
            for (let m = 0; m < this.state.matchs[l].opponents.length; m++) {
                if (winner === this.state.matchs[l].opponents[m].opponent.id) {
                    name = this.state.matchs[l].opponents[m].opponent.name;
                }
            }
        }

        const object = {};
        object.id_match = event;
        object.winner_id = winner;
        object.mise = mise;
        object.name = name;
        object.game = this.props.match.params.game;


        if (data1.bet.length === 0) {
            data1.bet.push(object);
            const requestOptions = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password"),
                    bet: data1.bet
                })
            };
            const response = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"), requestOptions);

            const requestOptions4 = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password"),
                    coin: data1.coin - object.mise
                })
            };
            const response4 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"), requestOptions4);
        } else {
            let cont = 0;
            for (let i = 0; i < data1.bet.length; i++) {

                if (data1.bet[i].id_match === object.id_match) {
                    cont = 1;
                }

            }

            if (cont === 0) {
                data1.bet.push(object);
                const requestOptions = {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: localStorage.getItem("email"),
                        password: localStorage.getItem("password"),
                        bet: data1.bet
                    })
                };
                const response = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"), requestOptions);

                const requestOptions4 = {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: localStorage.getItem("email"),
                        password: localStorage.getItem("password"),
                        coin: data1.coin - object.mise
                    })
                };
                const response4 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"), requestOptions4);
            }

        }

        document.location.reload();

    }

    render() {
        if (this.state.matchs.length === 0) {
            return (
                <div id='flex'>
                    <p>There is no upcoming match for this league.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1> Place your bets !</h1>
                    {this.state.matchs.map(match =>
                        <div>
                            {match.opponents.length > 0 &&
                                <div>
                                    <p className={"title-match"}>{match.name}</p>
                                    <div className={match.id}>
                                        <div id='flex'>
                                            {match.opponents.map(opponent =>

                                                <div className="team">
                                                    {this.state.bet.indexOf(match.id) === -1 ?
                                                        <input id={opponent.opponent.id} type="radio" name={match.id}
                                                               value={opponent.opponent.id}/> : <div></div>}

                                                    <Link key={opponent.opponent.id} game={this.props.match.params.game}
                                                          to={`/${this.props.match.params.game}/team/${opponent.opponent.id}`}>
                                                        <img id={"img-team"} src={opponent.opponent.image_url} alt='opponent'/>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {this.state.bet.indexOf(match.id) === -1 ?
                                            <div className="mise">
                                                <input type="number" min="1" max={this.state.coin}/>
                                                <button id="bet" onClick={() => this.handleInputChange(match.id)}>Bet
                                                </button>
                                            </div> : <div className="mise">You already bet on this match</div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </div>
            )
        }
    }

}

export default Match;