import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

import CardContent from '@material-ui/core/CardContent';

import DateRange from "@material-ui/icons/DateRange";
import LocationCityOutlined from "@material-ui/icons/LocationCityOutlined";
import Update from "@material-ui/icons/Update";
import PeopleOutline from '@material-ui/icons/PeopleOutlineOutlined';
import AccountBalanceOutlined from '@material-ui/icons/AccountBalanceOutlined';
import AccessAlarmOutlined from '@material-ui/icons/AccessAlarmOutlined';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';

import GridItem from './Grid/GridItem';
import GridContainer from './Grid/GridContainer';

import Card from "../components/Card/Card.jsx";
import CardIcon from "./Card/CardIcon";
import CardFooter from './Card/CardFooter';
import CardHeader from './Card/CardHeader';

import dashboardStyle from '../css/dashboardStyle'

import LoadingOverlay from 'react-loading-overlay';
import {RingLoader} from 'react-spinners';


const FooterTextStyle = {
  paddingTop:26,
  fontSize:17
}



class DashboardHome extends React.Component {
  state = {
    loader:true,
    registeredCount : null,
    projectCount:null,
    unitCount:null,
    revenue:0
  };

      
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getCounts = () =>{
    this.setState({loader:true})
    const apiUrl = '/api/counts'
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
          this.setState({registeredCount:response.rc,projectCount:response.pc,unitCount:response.ac,loader:false})
        }
        else{
          this.setState({loader:false})
        }
    })
    .catch((error) => {
      this.setState({loader:false})
    })
  }

  getCounts2 = () =>{
    this.setState({loader:true})
    const apiUrl = '/api/counts2'
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
          this.setState({revenue:response.revenue})
        }
        else{
          // alert('No users found')
        }
    })
    .catch((error) => {
      alert(error)
    })
  }

  componentDidMount = ()=>{
    this.getCounts();
    this.getCounts2();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoadingOverlay active={this.state.loader} spinner={<RingLoader size={150} color={'peru'}/>} text='Loading...'>

          <GridContainer>
            <GridItem>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Hi! Welcome to the admin dashboard.
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit'}).format(Date.now())}
                  </Typography>
                </CardContent>
              </Card>
            </GridItem>
          </GridContainer>
     
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color='primary' stats icon>
                <CardIcon color='primary'>
                  <MonetizationOnOutlined />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>  TZS  {this.numberWithCommas(this.state.revenue)} </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange /> 
                  <Typography variant='display1' style={FooterTextStyle}>Revenue for {new Intl.DateTimeFormat('en-US',{month:'long'}).format(Date.now())}</Typography>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <AccessAlarmOutlined />
                </CardIcon>
                <p className={classes.cardCategory}>Rent dues</p>
                <h3 className={classes.cardTitle}>{this.state.projectCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange /> 
                  <Typography variant='display1' style={FooterTextStyle}>Contracts ending in {new Intl.DateTimeFormat('en-US',{month:'long'}).format(Date.now())}</Typography>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
              <CardIcon color="warning">
                  <PeopleOutline/>
                </CardIcon>
                <p className={classes.cardCategory}>Users registered</p>
                <h3 className={classes.cardTitle}>+{this.state.registeredCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  <Typography variant='display1' style={FooterTextStyle}>Updated now</Typography>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <AccountBalanceOutlined />
                </CardIcon>
                <p className={classes.cardCategory}>Units taken</p>
                <h3 className={classes.cardTitle}>  +{this.state.unitCount}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocationCityOutlined /> 
                  <Typography variant='display1' style={FooterTextStyle}>Occupied </Typography>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        </LoadingOverlay>
      </div>
    );
  }
}

DashboardHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(DashboardHome);