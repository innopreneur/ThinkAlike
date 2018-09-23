import React, { Component } from 'react';
import { Card, 
    Container, 
    Col, 
    Row, 
    Button, 
    Modal, 
    InputGroup, 
    FormControl } from 'react-bootstrap/lib';
import { FaClock, FaEthereum, FaCalendarAlt } from 'react-icons/fa';
import './Game.css';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            showConfirmStackModal: false,
            currentSelection: ""
        }
    }

    handleClick(e){
        e.preventDefault();
        this.handleShow(e.target.id);
    }

    handleClose() {
        this.setState({ showConfirmStackModal: false, currentSelection:"" });
      }
    
    handleShow(currentSelection) {
    this.setState({ showConfirmStackModal: true, currentSelection});
    }

    handleStackConfirmation(e){
        //handle amount of ETH stacked
    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
      
        return day + '/' + monthIndex + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds ;
      }
      
    render(){
      
        let {opt1Clicked, opt2Clicked, showConfirmStackModal} = this.state;
        let data = this.props.data;
        return(
            <div>
            <Card>
                <Container className="game-item-container">
                    <Row>
                        <Col as="div" xs={2} md={2} lg={2} className="game-item-index-container">
                            <div >#{this.props.index}</div>
                        </Col>
                        <Col as="div" xs={7} md={7} lg={7} className="game-item-details-container">
                            <Row as="div" className="game-item-metadata-container"> 
                                <div className="game-item-expiry-container">
                                    <span className="game-item-expiry-icon"><FaClock /></span>
                                    <span className="game-item-expiry-time">{data.expiresIn} min left</span>
                                </div>
                                <div className="game-item-value-container">
                                    <span className="game-item-value-icon"><FaEthereum /></span>
                                    <span className="game-item-value">{data.value} ETH</span>
                                </div>
                                <div className="game-item-date-container">
                                    <span className="game-item-date-icon"><FaCalendarAlt /></span>
                                    <span className="game-item-date">{this.formatDate(data.createdOn)}</span>
                                </div>
                            </Row>
                            <Row as="div" className="game-item-question-container">
                                {data.question}  
                            </Row>
                            <Row as="div" className="game-item-options-container">
                                <Button variant="outline-primary" 
                                        className="game-item-option"
                                        id="option1"
                                        onClick={this.handleClick.bind(this)}
                                        >
                                        {this.props.data.option1}
                                </Button>
                                <Button variant="outline-primary" 
                                        className="game-item-option"
                                        id="option2"
                                        onClick={this.handleClick.bind(this)}
                                        >
                                         {this.props.data.option2}
                                </Button>
                                
                            </Row>
                        </Col>
                        <Col as="div" xs={3} md={3} lg={3} className="game-item-votes-container">
                            <div className="game-item-votes-label">
                            Votes
                            </div>
                            <div className="game-item-votes-count">
                            {this.props.data.votes}
                            </div>
                                
                        </Col>
                    </Row>
                </Container>
            </Card>

            <Modal show={showConfirmStackModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm your stack</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Let's confirm your stack by clicking blue button below. 
                    After clicking this button, you will have to confirm transaction on Metamask</Modal.Body>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>ETH</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)" />
                    <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                        I did it by mistake
                    </Button>
                    <Button variant="primary" onClick={this.handleStackConfirmation.bind(this)}>
                        Stack Me
                    </Button>
                </Modal.Footer>
            </Modal>
         </div>
        );
    }

}

export default Game;