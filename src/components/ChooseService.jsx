import React, {Component} from 'react';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
// import grey from '@material-ui/core/colors/grey';
import * as EdetailsActions from '../actions/EdetailsActions';

const styles = theme => ({
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

class Choose extends Component {

  handleChange = name => event => {
    this.props.handleChange([name],event.target.value);
  };

  render(){
    const {classes} = this.props;
    return (
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
              value={this.props.duration}
              onChange = {this.handleChange('duration')}
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
    )
  }
}



const mapStateToProps = (state) => {
  return {
    duration: state.ed.duration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (m,n)=> dispatch(EdetailsActions.equipmentDetailsAction(m,n)),
    setupMonth: (itemValue) => dispatch(EdetailsActions.monthActionCreator(itemValue))
  };
};

Choose.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const ChooseService = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Choose));