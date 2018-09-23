import React, { Component } from 'react';
import {Container, Row} from 'react-bootstrap/lib';
import Header from './Header';
import GameContainer from './GameContainer'
import Sort from './../constants';

class MainContainer extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            sortBy: this.props.sortBy
        }
    }
   
    render(){
        console.log("state : " + this.state.sortBy);
        console.log("props : " +  this.props.sortBy);
        return(
            <Container>
                <Row className="game-container"><GameContainer sortBy={this.props.sortBy}/></Row>
            </Container>
         
        );
    }

}

export default MainContainer;