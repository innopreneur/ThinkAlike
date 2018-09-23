
import React, { Component } from 'react';
import {Nav, Navbar, DropdownButton, Dropdown, Button} from 'react-bootstrap/lib';
import './Header.css';
import { Route, Link } from 'react-router-dom';
import  Constants from './../constants';


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortBy: this.props.sortBy,
            sortTitle: "Sort By"
        }
    }
  
    handleSortSelect(eventKey, event){
        event.preventDefault(); 
        this.setState({sortBy: eventKey, sortTitle: event.target.text});
        this.props.onSortSelect(eventKey);
    }

    handleNav(eventKey, event){
        console.log(eventKey);
        console.log
    }

    render(){
        return(
            <div className="navbar-container">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand eventKey={Constants.HOME} onSelect={this.handleNav.bind(this)} href="/">ThinkAlike</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link eventKey={Constants.ABOUT} onSelect={this.handleNav.bind(this)}><Link to="/about" className="link-page">About</Link></Nav.Link>
                        <Nav.Link eventKey={Constants.CLAIM} onSelect={this.handleNav.bind(this)}><Link to="/claim" className="link-page">Did I won?</Link></Nav.Link>
                        <Nav.Link eventKey={Constants.PROOF} onSelect={this.handleNav.bind(this)}><Link to="/proof" className="link-page">Proof Of Result</Link></Nav.Link>
                    </Nav>
                    <Button variant="outline-light" className="create-game-btn" eventKey={Constants.NEW} onSelect={this.handleNav.bind(this)}><Link to="/new" className="link-page">Create Game</Link></Button>
                    <DropdownButton id="sortByButton" title={this.state.sortTitle} variant="light">
                        <Dropdown.Item eventKey={Constants.TOTAL_VOTES} onSelect={this.handleSortSelect.bind(this)}>total votes (default)</Dropdown.Item>
                        <Dropdown.Item eventKey={Constants.EXPIRY} onSelect={this.handleSortSelect.bind(this)}>expiry</Dropdown.Item>
                        <Dropdown.Item eventKey={Constants.RECENTLY_ADDED} onSelect={this.handleSortSelect.bind(this)}>recently added</Dropdown.Item>
                        <Dropdown.Item eventKey={Constants.TOTAL_VALUE} onSelect={this.handleSortSelect.bind(this)}>total value</Dropdown.Item>
                    </DropdownButton>
                </Navbar>
            </div>
    );
    }

}

export default Header;

