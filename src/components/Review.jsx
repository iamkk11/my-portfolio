import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {Container,Row,Col,Table} from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as EdetailsActions from '../actions/EdetailsActions';
import {numberWithCommas} from '../services';

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

const reviewdataStyle = {
  fontSize:16,
  // fontWeight:'bold'
}

class Rev extends React.Component{
  state={
    network:''
  }

  handleChangeState = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render(){
    const {classes} = this.props;
    return (
      <Container >
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>#</th>
              <th  colSpan="2">Particulars</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td  colSpan="2">Tarehe ya kuanza</td>
              <td>{this.props.newStart}</td>
            </tr>
            <tr>
              <td>2</td>
              <td  colSpan="2">Tarehe ya kuisha</td>
              <td>{this.props.newEnd}</td>
            </tr>
            <tr>
              <td>3</td>
              <td  colSpan="2">Kodi</td>
              <td>{numberWithCommas(this.props.basket[0] || '')}</td>
            </tr>
            <tr>
              <td>4</td>
              <td  colSpan="2">Vyengine</td>
              <td>{numberWithCommas(this.props.basket[1] || '')}</td>
            </tr>
            <tr>
              <td>5</td>
              <td colSpan="2">Charges</td>
              <td>{numberWithCommas(this.props.basket[2]) }</td>
            </tr>
            <tr>
              <td>6</td>
              <td colSpan="2">Jumla</td>
              <td>{numberWithCommas(this.props.basket[3] || '') }</td>
            </tr>
          </tbody>
        </Table>

        <Row>
          <Col xs={6} md={4}>
            <Typography variant = 'display1' gutterBottom style={reviewdataStyle} >Chagua Njia ya kulipa:</Typography>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={4}>
            <RadioGroup
              className={classes.group}
              value={this.state.network}
              onChange={this.handleChangeState('network')}
            >
              <FormControlLabel value="Tigo Pesa" control={<Radio />} label="Tigo Pesa" classes={{label:classes.label}}/>
              {/* <FormControlLabel value="M-Pesa" control={<Radio />} label="M-Pesa" classes={{label:classes.label}}/> */}
              <FormControlLabel value="Airtel Money" control={<Radio />} label="Airtel Money" classes={{label:classes.label}}/>
            </RadioGroup>
          </Col>
        </Row>

        <Row>
          <TextField
            required
            id="outlined-phone-field"
            label="Namba ya simu"
            className={classes.textFieldOther}
            value={this.props.phone}
            onChange={(event)=>this.props.handleChange(event.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="Namba ya simu"                                    
            InputLabelProps={{className: classes.inputLabelProps}}
            InputProps={{className: classes.inputBox}}
          />
        </Row>
      </Container>
    );
  }
}

Rev.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    basket: state.bucket,
    newStart: state.newStartDate,
    newEnd: state.newEndDate,
    phone:state.phoneReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (p)=> dispatch(EdetailsActions.phoneActionCreator(p)),
  };
};

export const Review = connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Rev));

// export default withStyles(styles)(Rev);