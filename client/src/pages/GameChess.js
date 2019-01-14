import React, { Component } from "react";
import Wheel from "../components/Wheel";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    fontSize: "26px",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,

  },  
  box: {
    textAlign: "center",
    fontSize: "60px",
    height: "300px",
    weight: "200px",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
    width: 400,
  },
  textFieldFull: {
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
  },
  grow: {
    margin: theme.spacing.unit * 10,
    textAlign:"center",
  }
});


class GameChess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      min: 1,
      max: 255,
      wager: 0,
      back: 0,
    }
  }

  handleChange = (name) => (even) => {

    let virState = this.state;

    if (Number(even.target.value).toString() === "NaN") {
      this.setState({[name]: this.state[name]});
      return;
    }

    if (!(even.target.value === "" || (Number(even.target.value) <= 255 && Number(even.target.value >= 1)))) {
      this.setState({[name]: this.state[name]});
      return;
    }
    
    virState[name] = Number(even.target.value);

    this.setState({
      [name]: Number(even.target.value),
    })
    
    if (virState.min > virState.max) {
      this.setState({min: virState.max});
      virState.min = virState.max;
    }

    if (virState.max < virState.min) {
      this.setState({max: this.state.min})
      virState.max = virState.min;
    }

    this.setState({
      back: virState.wager * (1000000000000000000 + (1000000000000000000 - ((virState.max - virState.min) * 1000000000 / 254) ** 2)) / 1000000000000000000,
    });

    this.props.getValue(this.state);
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>

      <Typography variant="h5" color="secondary"  style={{fontFamily: "Roboto",
      textAlign:"center",}}>
      Bonus Pool {this.props.storageValue / 1000000000000000000} ETH
    </Typography>


        <div id="box" className={classes.box}>
          <Wheel speed={1} />
          <Wheel speed={2} />
          <Wheel speed={3} />
        </div>
        <form className={classes.container} autoComplete="off">
          <TextField
            id="start"
            label="min"
            className={classes.textField}
            value={this.state.min}
            onChange={this.handleChange('min')}
            margin="normal"
          />
          <TextField
            id="end"
            label="max"
            className={classes.textField}
            value={this.state.max}
            onChange={this.handleChange('max')}
            margin="normal"
          />
          <TextField
            id="Bet"
            label="Wager"            
            InputProps={{
              startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
            }}
            className={classes.textField}
            value={this.state.wager}
            onChange={this.handleChange('wager')}
            margin="normal"
          />
          <TextField
          id="back"
          label="Return"
          InputProps={{
            startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
          }}
          className={classes.textField}
          value={this.state.back}
          onChange={this.handleChange('back')}
          margin="normal"
        />

        </form>          
        <Typography variant="h5" color="secondary" className={classes.grow} style={{fontFamily: "Roboto"}}>
            Guess number from 1 to 255, if the hashcode[0,8] of the next block in blockchain is between your numbers, you win!
        </Typography>
      </Paper>
    );
  }
}

GameChess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameChess);