import React, { Component } from "react";
import Bet from "./contracts/Bet.json";
import getWeb3 from "./utils/getWeb3";
import ButtonAppBar from "./components/ButtonAppBar.js";
import GameChess from "./pages/GameChess.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, value: null, state: null, trans: new Set()};

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
        fromBlock: 0,
        filter: {bettedAdress: accounts[0]},
      }, (err, event) => {
        console.log(listenBlocks);
        if (event.blockNumber >= listenBlocks) 
          this.getReturn(); 
        this.setState({trans: this.state.trans.add(event.blockHash)})
        console.log(this.state.trans)
      })
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
    const response = await contract.methods.getETHPool().call();
    this.setState({ storageValue: response });
  }

  
  createData(id, address) {
    return { id, address, winNumber: Number(address.substr(0,4))};
  }
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const {classes} = this.props;
    let rows = Array.from(this.state.trans);
    if (rows.length !== 0) {
      rows = rows.map((row, index) => (this.createData(index,row)))
    }
    return (
      <div className="App">
        <CssBaseline />
        <ButtonAppBar getState={this.betting} extendList={this.extendList}></ButtonAppBar>
        <GameChess storageValue={this.state.storageValue} getValue={(value) => this.setState({value: value})}></GameChess>

        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>{"Transaction Block Hash Code"}</CustomTableCell>
              <CustomTableCell align="right">{"The Win Number"}</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.address}
                </CustomTableCell>
                <CustomTableCell align="right">{row.winNumber}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);