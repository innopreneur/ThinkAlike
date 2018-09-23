import React, { Component } from 'react';
import {Container, Row} from 'react-bootstrap/lib';
import Game from './Game';
import games from './games';
import Sort from './../constants';

class GameContainer extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            games: [],
            sortBy: this.props.sortBy
        }
    }

    componentDidMount(){
        //fetch all games and update state
        this.setState({games});
    }

    componentWillReceiveProps(nextProps){
        console.log("New props : " + nextProps.sortBy)
        if(this.props.sortBy != nextProps.sortBy)
            this.setState({sortBy: nextProps.sortBy})
    }
    sort(games, sortBy){
        //sort descending order of votes
        switch(sortBy){
            case Sort.TOTAL_VOTES:
                return games.sort(function(a, b){return b.votes - a.votes})
                break;
            case Sort.TOTAL_VALUE:
                console.log("in switch total votes")
                return games.sort(function(a, b){return b.value - a.value})
                break;
            case Sort.RECENTLY_ADDED:
                return games.sort(function(a, b){return b.createdOn - a.createdOn})
                break;
            case Sort.EXPIRY:
                return games.sort(function(a, b){return a.expiresIn - b.expiresIn})
                break;
            default:
                return games.sort(function(a, b){return b.votes - a.votes})
                break;
            console.log("Sort : " + sortBy);
        }
        
    }
    render(){
        return(
            <Container>
                {this.sort(this.state.games, this.state.sortBy).map((game, i) => <Game class="game-container" key={i+1} index={i+1} data={game} />)}  
            </Container>
         
        );
    }

}

export default GameContainer;