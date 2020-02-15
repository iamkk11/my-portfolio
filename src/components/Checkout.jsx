import React from 'react';
import {Button as BootStrapButton} from 'react-bootstrap';
import {Redirect} from 'react-router'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Review} from './Review';
import {connect} from 'react-redux';
// import costech2 from '../img/costech2.png';
import {RingLoader} from 'react-spinners';
import {withRouter} from "react-router-dom";
import swal from '@sweetalert/with-react';

import {ChooseService} from './ChooseService';
import * as EdetailsActions from '../actions/EdetailsActions';

import {SelcomServerAddress,user_agent} from '../services';


// import Lipa from './Lipa';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    paddingTop:25,
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 1200,//form white space width
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  toolbar: {
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
    paddingLeft: 20,
    fontSize:17,
    fontWeight:'bold',
  },
  overlay: {
    position: 'absolute',
    top:0,
    bottom: -400, //bottom space on overlay
    right:0,
    left:0,
  },
});

const steps = ['Miezi', 'Lipa'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ChooseService />;
    case 1:
      return <Review />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

class Check extends React.Component {
  state = {
    activeStep: 0,
    loader:false,
    redirectlogin:false,
  };

  handlePay=()=>{
    const {token,basket,newStart,duration,phone,name} = this.props;
    const newStartDate = new Date(newStart);
    const data = JSON.stringify({phone:`${phone}`,name:`${name}`,amount:`${basket[3]}`,duration:duration,startDate:newStartDate});
    const url = `${SelcomServerAddress}/v1/api/mobilemoney`;
    this.setState({loader:true});
    fetch(url,{
      method:'POST',
      headers:{
        'User-Agent': user_agent,
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:data
    })
    .then((response) => response.json())
    .then((r) => {
      if(r.success===true){
        swal('','Malipo yamekamilika','success');
        this.setState({loader:false})
      }
      else{
        this.setState({loader:false});
        swal('','Kuna kitu hakipo sawa','error');
      }
    })
    .catch((error) => {
      this.setState({loading:false});
      swal('','Kuna kitu hakipo sawa','error');
    })
  }

  handlePhoneNo = () =>{
    const {phone} = this.props;
    const phoneString = `${phone}`;
    const first3Digits = phoneString.slice(0,3);
    const phoneNoLength = phoneString.length;
    if (phoneNoLength === 12 && first3Digits === '255'){
      this.handlePay();
    }
    else if (phone===''){
      swal('','Haujaweka namba ya simu','error');
    }
    else{
      swal('','Weka namba namna hii: 255 XXX XXX XXX. e.g 255714876321','error');
    }
  }

  handleSubmit = ()=>{
    this.setState({loader:true});
    this.dates();
    this.getFees();
  }

  dates = ()=>{
    const {duration,token} = this.props;
    const data = JSON.stringify({duration:duration});
    const url = '/v1/app/confirm';
    fetch(url,{
      method:'POST',
      headers:{
        'User-Agent': user_agent,
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:data
    })
    .then((response) => response.json())
    .then((response) => {
      this.props.setupNewStartDate(response.oldend);
      this.props.setupNewEndDate(response.newend);
      this.props.setupPhone(response.phone);
      this.props.setupName(response.name);
    })
    .catch((error) => {
      swal('','Connection imekatika','error');
    })
  }

  getFees = () =>{
    const {duration,token} = this.props;
    const data = JSON.stringify({duration:duration})
    const url = '/v1/app/getfees';
    fetch(url,{
      method:'POST',
      headers:{
        'User-Agent': user_agent,
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:data
    })
    .then((response) => response.json())
    .then((response)=>{
      this.setState({loader:false});
      if (response.payload[0]==='NA'){
        swal('','Mwezi hauruhisiwi','error')
      }
      else{
        this.props.setupBasket(response.payload);
        this.handleNext();
      }
    })
    .catch((error) => {
      swal('','Connection imekatika','error');
      this.setState({loader:false});
    })
  }

  handleSubmitFunctions = () =>{
    const {activeStep} = this.state;
    if (activeStep===0){
      this.handleSubmit();
    }
    if (activeStep===1){
      this.handlePhoneNo();
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleLogout = ()=>{
    const apiUrl = '/api/logout'
    fetch(apiUrl,{
    method:'GET',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.success===true){
          this.setState({redirectlogin:true});
          localStorage.removeItem('token');
        }
        else{
          alert('warning failed')
        }
    })
    .catch((error) => {
      alert('warning failed at catch')
    })
  }

  hydrateTokenWithLocalStorage(){
    let key = 'token'
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value);
        this.props.tokenStore(value);
      } 
      catch (e) {
        // handle empty string
        // this.setState({ [key]: value });
        alert(e)
      }
    }
  }

  saveStateToLocalStorage() {
    let key = 'token';
    localStorage.setItem(key, JSON.stringify(this.props.token));
  }

  componentDidMount = () =>{
    this.hydrateTokenWithLocalStorage();
    window.addEventListener('beforeunload', (event) => {
      this.saveStateToLocalStorage();
    });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage()
    );
  }

  render() {
    const {classes} = this.props;
    const {activeStep,redirectlogin} = this.state;

    if (redirectlogin) {
      return <Redirect to = "/" />
    }

    return (
      <React.Fragment>
        <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar className={classes.toolbar}> 
              {/* <img alt = '' src = {costech2} height={50} /> */}

              <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                Pangisha App
              </Typography>

              <BootStrapButton variant="primary" onClick={this.handleLogout}>
                Logout
              </BootStrapButton>

            </Toolbar>
          </AppBar>

          <main className={classes.layout}>
            <Paper className={classes.paper}>
              
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel ><Typography variant='h5'style={{fontSize:17,fontWeight:'bold'}} >{label}</Typography></StepLabel>
                  </Step>
                ))}
              </Stepper>

              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="display1" gutterBottom style={{fontSize:19,fontWeight:'bold'}}>
                      Thank you for your submission.
                    </Typography>
                    <Typography variant="display1" style={{fontSize:15,fontWeight:'bold'}}>
                      Your data has been saved. It shall not be shared or utilized otherwise in lieu of Personal Data Protection Act and The 2015 National Statistics Act.
                    </Typography>
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleReset}
                          className={classes.button}
                        >
                          Reset
                      </Button>    
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={this.handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmitFunctions}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Lipa' : 'Endelea'}
                        <RingLoader loading={this.state.loader} size={27} color='white' />
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
      </React.Fragment>
    );
  }
}

Check.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    duration:state.ed.duration,
    phone:state.phoneReducer,
    basket: state.bucket,
    newStart: state.newStartDate,
    name:state.nameReducer,
    token:state.tokenReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setupMonth: (itemValue) => dispatch(EdetailsActions.monthActionCreator(itemValue)),
    setupNewStartDate: (newS) => dispatch(EdetailsActions.newstartdateActionCreator(newS)),
    setupNewEndDate: (newE) => dispatch(EdetailsActions.newEnddateActionCreator(newE)),
    setupBasket: (r) => dispatch(EdetailsActions.setthebasket(r)),
    setupPhone: (p) => dispatch(EdetailsActions.phoneActionCreator(p)),
    setupName: (name) => dispatch(EdetailsActions.setName(name)),
    tokenStore: (token) => dispatch(EdetailsActions.setToken(token))
  };
};

export const Home = withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Check)));