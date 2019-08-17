import React from 'react';
import {Redirect} from 'react-router'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import HomeOutlined from '@material-ui/icons/HomeOutlined';
import BarChartOutlined from '@material-ui/icons/BarChartOutlined';
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined';
import TableChartOutlined from '@material-ui/icons/TableChartOutlined';
import PowerSettingsNewOutlined from '@material-ui/icons/PowerSettingsNewOutlined';

import ses from '../img/ses.png';

import DashboardHome from '../components/Cards'
import Analytics from '../components/Analytics';
import Muitable from '../components/muitable';
import AddTenant from '../components/addTenant';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor:'	#D3D3D3',
    color: 'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: { //makes app bar content great 
    flexGrow: 1,
    paddingLeft: 20,
    fontSize:17,
    fontWeight:'bold'
  },
  drawerPaper: {
    backgroundColor:'FloralWhite ',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  // appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    paddingTop:70,
  
    // marginLeft: -22,
    // display:'flex',
    // justifyContent:'center'
  },
  tableContainer: {
    height: 320,
  },
  typographyStyle: {
    fontSize:18,
    color:'black',
    fontWeight:'bold'
  },
  iconStyle: {
    color:'black',
  },
  logoutStyle:{
    // marginTop:185,
    // display:'flex',
    // flex:1,
    // justifyContent:'flex-end',
  },
});

function getDashboardComponent(step) {
  switch (step) {
    case 0:
      return <DashboardHome />;
    case 1:
      return <Muitable />;
    case 2:
      return <Analytics />;
    case 3:
      return <AddTenant />;
    default:
      // return <DashboardHome />;
  }
}

class Dashboard extends React.Component {
  state={
    open:false,
    logoutdashboard:false,
    component:0
  }
  
  handleDrawerOpen = () => {
    this.setState({open:true})
  };

  handleDrawerClose = () => {
    this.setState({open:false})
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
          this.setState({logoutdashboard:true})
        }
        else{
        }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const {classes} = this.props;
    const {logoutdashboard} = this.state;

    if (logoutdashboard) {
      return <Redirect to = '/' />
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >

              <MenuIcon />
              </IconButton>
              <img alt = '' src = {ses} height={50} />

              <Typography variant="title" style={{color:'DarkRed',fontWeight:'bold'}} noWrap className={classes.title}>
                Dashboard
              </Typography>

            </Toolbar>

          </AppBar>

          <Drawer
            variant="permanent"
            classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />
            <Divider />
            
            <List >
  
              <ListItem button  onClick={()=>{this.setState({component:0})}} >
                <ListItemIcon>
                  <HomeOutlined className={classes.iconStyle}/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="display3" className={classes.typographyStyle}>Home</Typography>} />
              </ListItem> 

              <Divider />
              <Divider />

              <ListItem button  onClick={()=>{this.setState({component:1})}} >
                <ListItemIcon>
                  <TableChartOutlined className={classes.iconStyle}/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="display3" className={classes.typographyStyle}>Tenants</Typography>} />
              </ListItem>

              <Divider />
              <Divider />

              <ListItem button  onClick={()=>{this.setState({component:2})}} >
                <ListItemIcon>
                  <BarChartOutlined className={classes.iconStyle}/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="display3" className={classes.typographyStyle}>Analytics</Typography>} />
              </ListItem>

              <Divider />
              <Divider />

              <ListItem button onClick={()=>{this.setState({component:3})}} >
                <ListItemIcon>
                  <PersonAddOutlined className={classes.iconStyle}/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="display3" className={classes.typographyStyle}>Add tenant</Typography>} />
              </ListItem> 

            </List>
            
            <Divider />
            <Divider />

            <ListItem button onClick={this.handleLogout}>
              <ListItemIcon>
                <PowerSettingsNewOutlined className={classes.iconStyle}/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="display3" className={classes.typographyStyle}>Logout</Typography>} />
            </ListItem>

            <Divider />
            <Divider />

          </Drawer>

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              <Typography component="div" className={classes.chartContainer}>
                  {getDashboardComponent(this.state.component)}
              </Typography>
          </main>
          
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard)