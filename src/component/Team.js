import React, { Component } from 'react';

class Team extends Component{

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
        }
    }

    async componentDidMount(){
        const response = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/teams?filter[id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await response.json();
        this.setState({
            teams: data

        })
    }

    render() {
        return(
            <div>

                {this.state.teams.map(team =>
                    <div>
                        <p>{team.name} ({team.acronym})</p>
                        <img src={team.image_url}/>

                        {team.players.map(player =>
                            <div>
                                <img src={player.image_url} />
                                <p>{player.name}</p>
                                <p>Nationality : {player.nationality}</p>
                            </div>
                        )}

                    </div>
                )}
            </div>
        )
    }
}

export default Team;