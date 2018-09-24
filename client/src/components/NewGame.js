import React, { Component } from 'react';
import { Card, 
    Container, 
    Button, 
    Row, 
    Col,
    Form } from 'react-bootstrap/lib';
class NewGame extends Component {

    render(){
        return(
            <div>
            <Container className="new-game-container">
                <Row>
                <Card className="new-game-card" >
                    <Card.Header as="h5">Create A New Game</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group id="question-grp">
                                <Form.Control as="textarea" rows="2" placeholder="Type your question here!"/>
                            </Form.Group>

                              <Form.Group id="expiry-grp">
                                <Row>
                                    <Col>
                                    <Form.Control placeholder="Option 1" />
                                    </Col>
                                    <Col>
                                    <Form.Control placeholder="Option 2" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group id="expiry-grp">
                                <Form.Control placeholder="Expiry (in hours)" />
                            </Form.Group>

                            <Form.Group id="stack-grp">
                                <Form.Control placeholder="Your stack (in ETH)" />
                            </Form.Group>

                            <Form.Group id="stacked-option-grp">
                                <Row>
                                    <Col>
                                        <Form.Check
                                            disabled
                                            type="radio"
                                            label= "Option 1"
                                            id="option-1-radio"
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            disabled
                                            type="radio"
                                            label= "Option 2"
                                            id="option-2-radio"
                                        />
                                    </Col>
                                </Row>
                             </Form.Group>
                            <Form.Group id="submit-grp">
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit">
                                    Submit Game
                                    </Button>
                                 </Col>
                                 <Col>
                                    <Button variant="danger" type="submit">
                                    Cancel
                                    </Button>
                                 </Col>
                            </Row>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                </Row>
            </Container>
            </div>
            
  
             
         
        );
    }

}

export default NewGame;