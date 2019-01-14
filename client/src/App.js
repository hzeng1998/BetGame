import React, { Component } from "react";
import Bet from "./contracts/Bet.json";
import getWeb3 from "./utils/getWeb3";
import ButtonAppBar from "./components/ButtonAppBar.js";
import GameChess from "./pages/GameChess.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, value: null, state: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bet.networks[networkId];
      const instance = new web3.eth.Contract(
        Bet.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const listenBlocks = await instance.methods.getUnclearBet().call();

      instance.events.Betted({
        fromBlock: listenBlocks,
      }, (err, event) => {if (event.returnValues.bettedAdress) this.getReturn()})
      .on('data', (event) => console.log(event));
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runEther);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runEther = async () => {
    const { contract } = this.state;

    // Stores a given value, 5 by default.
  //  await contract.methods.betting(5).send({ from: accounts[0], value: });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getETHPool().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  betting = async () => {
    const {contract, accounts, value, web3} = this.state;
    await contract.methods.betting(value.min, value.max)
      .send({from: accounts[0], value: web3.utils.toWei(web3.utils.toBN(value.wager)), gas: 50000000})
    console.log("betting Succeed");
  }

  getReturn = async () => {
    const {contract, accounts, web3} = this.state;
    await contract.methods.clear().send({from: accounts[0], gas: 50000000});
    contract.methods.getHashSize().call().then((result) => console.log(result));
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <CssBaseline />
        <ButtonAppBar getState={this.betting}></ButtonAppBar>
        <GameChess storageValue={this.state.storageValue} getValue={(value) => this.setState({value: value})}></GameChess>
      </div>
    );
  }
}

export default App;
