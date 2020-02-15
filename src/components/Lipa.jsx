import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
// import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  background:{
    display:'flex',
    // backgroundColor:grey[200],
  },
  paper: {
    backgroundColor:'white',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:60,
    border:'solid',
    borderWidth:0.2,
    borderColor:'peru'
  },
  inputLabelProps:{
    fontSize:15,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const months = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 12,
    label: '12',
  },
];

class Lipa extends Component {
  state = {
    loader:false,
    duration:''
  }

  handleChange = name => event => {
    this.setState({[name]:event.target.value});
  };

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.background}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} spellcheck="false">
            <TextField
              variant="outlined"
              select
              margin="normal"
              required
              fullWidth
              label="Chagua miezi unayokaa"
              InputLabelProps={{className: classes.inputLabelProps}}
              InputProps={{startAdornment: <InputAdornment position="start"><DateRangeOutlined  /></InputAdornment>}}
              value={this.state.duration}
              onChange = {this.handleChange('duration')}
              error={this.state.durationError}
              onKeyPress={(event)=>this._onKeyPress(event)}
              SelectProps={{native:true}}
            >
              {
                months.map(option => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
                ))
              }
            </TextField>
          </form>
        </div>
      </Container>
      </div>
    )
  }
}

Lipa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Lipa);