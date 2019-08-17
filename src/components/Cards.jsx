import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

import DateRange from "@material-ui/icons/DateRange";
import LocationCityOutlined from "@material-ui/icons/LocationCityOutlined";
import Update from "@material-ui/icons/Update";
import PeopleOutline from '@material-ui/icons/PeopleOutlineOutlined';
import AccountBalanceOutlined from '@material-ui/icons/AccountBalanceOutlined';
import AccessAlarmOutlined from '@material-ui/icons/AccessAlarmOutlined';

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
  paddingTop:2.2,
  fontSize:14
}

class DashboardHome extends React.Component {
  state = {
    loader:true,
    registeredCount : null,
    projectCount:null,
    unitCount:null,
  };

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

  componentDidMount = ()=>{
    this.getCounts()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoadingOverlay active={this.state.loader} spinner={<RingLoader size={150} color={'peru'}/>} text='Loading...'>

        <GridContainer>

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
        <GridContainer>
  
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