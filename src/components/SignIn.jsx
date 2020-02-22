import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutline from '@material-ui/icons/PersonOutline';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import costech from '../img/ses.png';
import swal from '@sweetalert/with-react';
import {RingLoader} from 'react-spinners';
import InputAdornment from '@material-ui/core/InputAdornment';
import grey from '@material-ui/core/colors/grey';
import * as EdetailsActions from '../actions/EdetailsActions';
import {withRouter} from "react-router-dom";
import {user_agent} from '../services';

const styles = theme => ({
  background:{
    display:'flex',
    backgroundColor:grey[200],
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Sign extends Component {
  state = {
    // email:'kevnkiwan@gmail.com',
    // password:'kq',
    email:'',
    password:'',
    alertSweet:'',
    loader:false,
    emailerror:false,
    passworderror:false,
    resetpasswordstate:false,
    dash:false,
    home:false
  }

  handleChange = name => event => {
    this.setState({[name]:event.target.value});
  };

  validateRequired = ()=>{
    const {email,password} = this.state;
    if (email=== '' && password!== ''){
      this.setState({emailerror:true,alertSweet:this.sweetAlert('','You did not enter your username','error')})
    }
    else if (email!== '' && password=== ''){
      this.setState({passworderror:true,alertSweet:this.sweetAlert('','You did not enter the password','error')})
    }
    else if (email=== '' && password=== ''){
      this.setState({passworderror:true,emailerror:true,alertSweet:this.sweetAlert('','Email & Password are empty','error')})
    }
    else{
      this.handleSignIn();
    }
  }

  sweetAlert=(title,text,icon)=>{
    swal({title: title,text: text,icon: icon})
  }

  handleSignIn = ()=>{
    this.setState({loader:true})
    const {email,password} = this.state;
    const data = JSON.stringify({username:email,password:password});
    const url = '/auth'
    fetch(url,{
      method:'POST',
      credentials:'include',
      headers:{
        'User-Agent':user_agent,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:data
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.success===true){
        this.setState({loader:false});
        this.props.tokenStore(response.token);
        if (response.role === 'admin'){
          this.setState({dash:true,home:false})
        }
        else if (response.role === 'user'){
          this.setState({dash:false,home:true})
        }
        else{
          this.setState({alertSweet:this.sweetAlert("Tatizo",".","error"),error:true})
        }
      }
      else{
        this.setState({alertSweet:this.sweetAlert("Tatizo","Kuna kitu hakipo sawa.","error"),loader:false,error:true})
      }

    })
    .catch((error) => {
      this.setState({alertSweet:this.sweetAlert("","Umekosea username au password","error"),loader:false,error:true})
    })
  }

  handlePasswordReset = ()=>{
    this.setState({loader:true})
    const {email} = this.state;
    const data = JSON.stringify({username:email});
    const apiUrl = '/resetpassword'
    fetch(apiUrl,{
    method:'POST',
    headers:{
      'User-Agent':user_agent,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:data
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.success===true){
          this.setState({loader:false,resetpasswordstate:false,alertSweet:this.sweetAlert("Password Reset","You have successfully changed your password.","success")})
        }
        else{
          this.setState({loader:false,emailerror:true,resetpasswordstate:false})
        }
    })
    .catch((error) => {
      this.setState({loader:false,emailerror:true,resetpasswordstate:false})
    })
  }

  togglePasswordResetButton=()=>{
    this.state.resetpasswordstate ? this.setState({resetpasswordstate:false}) : this.setState({resetpasswordstate:true})
    this.clearLoginError();
  }

  clearLoginError = ()=>{
    this.setState({emailerror:false,passworderror:false})
  }

  _onKeyPress(event) {
    if (event.charCode === 13) { 
      event.preventDefault();
      this.validateRequired();
    } 
  }

  render(){
    const {classes} = this.props;
    const {dash,home} = this.state;
        
    if (dash) {
      return <Redirect to = '/dashboard' />
    }

    if (home){
      return <Redirect to = '/home' />
    }

    return (
      <div className={classes.background}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img alt = '' src = {costech} height={50} />
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">------ Sign in ------</Typography>
          <form className={classes.form} Validate onFocus={this.clearLoginError} spellcheck="false">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{startAdornment: <InputAdornment position="start"><PersonOutline  /></InputAdornment>}}
              value={this.state.email}
              onChange = {this.handleChange('email')}
              error={this.state.emailerror}
              onKeyPress={(event)=>this._onKeyPress(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{startAdornment: <InputAdornment position="start"><LockOutlinedIcon  /></InputAdornment>}}
              onChange = {this.handleChange('password')}
              value={this.state.password}
              error={this.state.passworderror}
              disabled={this.state.resetpasswordstate}
              onKeyPress={(event)=>this._onKeyPress(event)}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.state.resetpasswordstate ? this.handlePasswordReset : this.validateRequired}
            >
              <LockOpenOutlined />
              <Typography style={{paddingRight:10,paddingLeft:5}}>{this.state.resetpasswordstate ? 'Reset Password' : 'Login'}</Typography>
              <RingLoader loading={this.state.loader} size={27} color='white' />
            </Button>
            <Grid container>
              <Grid item xs>
                <Button color='primary' onClick={this.togglePasswordResetButton}>
                  <Typography style={{fontSize:12,color:'black'}}>Forgot password?</Typography>
                </Button>
              </Grid>
              <Grid item>
                {/* <Button color='primary'>
                  <a href="https://www.instagram.com/sesemilimited/" >
                    <Typography style={{fontSize:12,color:'black'}}>Don't have an account? Sign Up</Typography>
                  </a>
                </Button> */}
              </Grid>
            </Grid>
          </form>
        </div>
        <Box m={4}>
          <Typography variant="body2" color="textSecondary" align="center">
            <img src={costech} height={30} width={30} alt='*'/>
            {'Built with love by '}
            <Link color="inherit" href="https://www.instagram.com/pangishaapp/">
              Pangisha App Team
            </Link>
          </Typography>
        </Box>
      </Container>
      </div>
    )
  }
}

Sign.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    duration:state.ed.duration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tokenStore: (token) => dispatch(EdetailsActions.setToken(token))
  };
};

export const SignIn = withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Sign)));

// export default withStyles(styles)(SignIn);