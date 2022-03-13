import React, {Component} from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import Login from '../login/login';

class League extends Component {

    handleCheckboxChange = event => {
        this.setState({checked: event.target.checked})
    }

    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
            data: [],
            checked: true
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.pandascore.co/' + this.props.match.params.game + '/leagues?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            leagues: data,
        })

        const response2 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"));
        const data2 = await response2.json();
        const data3 = data2.favoris;
        this.setState({
            data: data3,
        })

        const fav = [];
        for (let a = 0; a < this.state.leagues.length; a++) {
            for (let b = 0; b < this.state.data.length; b++) {
                if (this.state.leagues[a].id === this.state.data[b]) {
                    fav.push(this.state.leagues[a]);
                    this.state.leagues.splice(a, 1)
                }
            }
        }
        this.setState({
            data: fav,
        })

    }

    async handleInputChange(event) {

        const response1 = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"));
        const data1 = await response1.json();
        if (document.getElementById(event).checked === true) {
            this.setState({checked: false});
        } else {
            this.setState({checked: true});
        }
        if (document.getElementById(event).checked === true) {
            data1.favoris.push(event);
        } else {
            for (let i = 0; i < data1.favoris.length; i++) {

                if (data1.favoris[i] === event) {
                    data1.favoris.splice(i, 1);
                    i--;
                }
            }
        }

        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
                favoris: data1.favoris
            })
        };
        const response = await fetch('http://localhost:3003/users/' + localStorage.getItem("id"), requestOptions);
        const data = await response.json();

        document.location.reload();

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
            return (
                <div>
                    <h1>Favorites</h1>
                    <div id="favorite">

                        {this.state.data.map(datas =>
                            <div className="bloc">
                                <input id={datas.id} checked={this.state.checked} type="checkbox"
                                       onChange={() => this.handleInputChange(datas.id)}/>
                                <Link key={datas.id} game={this.props.match.params.game}
                                      to={`/${this.props.match.params.game}/leagues/${datas.id}`}>
                                    <img src={datas.image_url} alt={'League'}/>
                                    <p>{datas.name}</p>
                                </Link>
                            </div>
                        )}
                    </div>


                    <h1>The Leagues</h1>
                    <div className="blocLeague">
                        {this.state.leagues.map(league =>

                            <div>
                                <Link key={league.id} game={this.props.match.params.game}
                                      to={`/${this.props.match.params.game}/leagues/${league.id}`}>

                                    <img src={league.image_url} alt="Card cap"/>
                                    <h5 className="card-title">{league.name}</h5>
                                </Link>
                                <div className="card-body">
                                     Add to favorite
                                    <input id={league.id} type="checkbox"
                                           onChange={() => this.handleInputChange(league.id)}/>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )
        }
    }
}

export default League;