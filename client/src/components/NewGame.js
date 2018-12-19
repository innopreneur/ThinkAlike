import React, { Component } from 'react';
import { Card, 
    Container, 
    Button, 
    Row, 
    Col,
    Form,
    Alert } from 'react-bootstrap/lib';
import { Redirect } from 'react-router-dom';
import getWeb3 from '../utils/getWeb3';
import './NewGame.css'; 
import config  from '../utils/config';
import DateTimePicker from './DateTimePicker';
let { SERVER, ROUTES } = config;
class NewGame extends Component {

    constructor(props){
        super(props);
        this.question = React.createRef();
        this.option1 = React.createRef();
        this.option2 = React.createRef();
        this.stack =  React.createRef();
        this.mySelection = React.createRef();
        this.state = { 
            redirectToGames: false, 
            voteSelected: "",
            showGameSavedAlert: false,
            expiry: new Date()
       }
    }

    renderRedirect(){
        if(this.state.redirectToGames){
            return <Redirect to='/home' />
        }
    }

    handleStartGame(){
        let self = this;
        //send game date to server
        let url = SERVER.PROTOCOL + '://' + SERVER.HOST + ':' + SERVER.PORT + ROUTES.NEW_GAME;
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(this.processDataForServer())
        }).then(function(response) {
            if(response.status == "200"){
                self.setState({showGameSavedAlert: true});
                //self.setState({redirectToGames: true});
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
        });
        
    }

    handleStakeSelection(e){
        this.setState({voteSelected: e.target.id})
    }

    processDataForServer(){
      return  {
            "question": this.question.current.value,
            "options": {
                "1": this.option1.current.value,
                "2": this.option2.current.value
            },
            "expiryType": "time",
            "expiry": this.state.expiry,
            "votes": 1,
            "value": parseInt(this.stack.current.value),
           "createdOn": new Date(),
           "isActive": true,
           "creator": {
               "address": "0x43455d40985fc42a8f79dce23d00fc6b231c8043",
               "vote": parseInt(this.state.voteSelected),
               "stake": parseFloat(this.stack.current.value)
                }
                   
        }

    }

    hideAlert(){
        this.setState({showGameSavedAlert : false, redirectToGames: true})
    }
    handleReset(){

    }
    handleExpiry(selectedDate){
        this.setState({
            expiry: selectedDate
        })
        console.log("expiry - " + this.state.expiry);
    }

    render(){
        return(
            <div className="new-game-container">
            {this.renderRedirect()}
            <Card className="new-game-card">
            <Container>
                <Row>
                <Alert 
                dismissible
                className = "game-saved-success-alert"
                show = {this.state.showGameSavedAlert} 
                key = "game-saved-alert" 
                variant = "primary"
                onClose = {this.hideAlert.bind(this)}>
                    Game saved successfully
                </Alert>
                <Col as="div" xs={12} md={12} lg={12}>
                <Card >
                    <Card.Header as="h5">Create A New Game</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group id="question-grp">
                                <Form.Control as="textarea" rows="2" ref={this.question} placeholder="Type your question here!"/>
                            </Form.Group>

                              <Form.Group id="expiry-grp">
                                <Row>
                                    <Col>
                                    <Form.Control ref={this.option1} placeholder="Option 1" />
                                    </Col>
                                    <Col>
                                    <Form.Control ref={this.option2} placeholder="Option 2" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group id="expiry-grp">
                            <div>Expires in : <DateTimePicker selection={this.handleExpiry.bind(this)}/></div>
                            
                            </Form.Group>

                            <Form.Group id="stack-grp">
                                <Form.Control ref={this.stack} placeholder="Your stack (in ETH)" />
                            </Form.Group>

                            <Form.Group id="stacked-option-grp">
                                <Row>
                                    <Col xs={2} md={2} lg={2}>
                                        <Form.Check
                                            type="radio"
                                            onClick={this.handleStakeSelection.bind(this)}
                                            label= "Option 1"
                                            id="1"
                                            name="options"
                                            ref={this.mySelection}
                                        />
                                    </Col>
                                    <Col xs={2} md={2} lg={2}>
                                        <Form.Check
                                            type="radio"
                                            onClick={this.handleStakeSelection.bind(this)}
                                            label= "Option 2"
                                            id="2"
                                            name="options"
                                            ref={this.mySelection}
                                        />
                                    </Col>
                                    <Col xs={8} md={8} lg={8}>
                                    </Col>
                                </Row>
                             </Form.Group>
                            <Form.Group id="submit-grp">
                            <Row>
                                <Col xs={2} md={2} lg={2}>
                                    <Button onvariant="primary" onClick={this.handleStartGame.bind(this)}>
                                    Submit
                                    </Button>
                                 </Col>
                                 <Col xs={2} md={2} lg={2}>
                                    <Button variant="danger" onClick={this.handleReset.bind(this)}>
                                    Reset
                                    </Button>
                                 </Col>
                                 <Col xs={6} md={6} lg={6}>
                                </Col>
                            </Row>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
                </Row>
            </Container>
            </Card>
            </div>       
        );
    }

}

export default NewGame;