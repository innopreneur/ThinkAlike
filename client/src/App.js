import React, { Component } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import Header from './components/Header';
import {Container, Row} from 'react-bootstrap/lib';
import getWeb3 from "./utils/getWeb3";
import { Route } from 'react-router-dom';
import About from './components/About';
import Proof from './components/Proof';
import Claim from './components/Claim';
import NewGame from './components/NewGame';
import Constants from './constants';
import DateTimePicker from './components/DateTimePicker';


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  constructor(props){
    super(props);
    this.state = {
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      sortBy: Constants.TOTAL_VOTES
    }
  }

  componentDidMount = async () => {
   try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      //const Contract = truffleContract(SimpleStorageContract);
      //Contract.setProvider(web3.currentProvider);
      //const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    } 
  };

  handleSortSelect(sortBy){
    console.log("New sortby : " + sortBy); 
    this.setState({sortBy});
  }
  render() {
  
  
    return (
      <div>
        <Container>
          <Row className="header"><Header sortBy={this.state.sortBy} onSortSelect={this.handleSortSelect.bind(this)}/></Row>
        </Container>
      <Route path="/" exact component={() => <MainContainer sortBy={this.state.sortBy}/>} />
      <Route path="/home" component={() => <MainContainer sortBy={this.state.sortBy}/>}/>
      <Route path="/about" component={About}/>
      <Route path="/claim" component={Claim}/>
      <Route path="/proof" component={Proof}/>
      <Route path="/new" component={NewGame}/>
      <Route path="/date" component={DateTimePicker} />
      </div>
    );
  }
}

export default App;

