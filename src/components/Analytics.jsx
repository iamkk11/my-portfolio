import React, { Component } from 'react';
import {Row,Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {AgeRange} from './ageRange';
import {SexDonut} from './SexDonut';
import {NetIncomeDonut} from './netIncomeDonut';
import SimpleBarChart from './daysBar';


// import '../css/Home.css';

const styles = theme => ({
    headings: {
        color:'DarkRed',
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:20,
    }, 
});

class Analytics extends Component {
    render() {
    const {classes} = this.props;
    return (
        <React.Fragment>
            <Row>
                <Typography variant="title" className={classes.headings} noWrap >
                    Room VS Days Left
                </Typography>

                <Divider />
                <Divider />

                <SimpleBarChart />

                <Divider />
                <Divider />

            </Row>

            <Row style={{paddingTop:30,paddingBottom:30}}>

                <Typography variant="title" className={classes.headings} noWrap >
                    Tenant Analytics
                </Typography>

                <Divider />
                <Divider />

                <br/>
                <br/>
 
                <Col xs={12} sm={4} className="person-wrapper">
                    <SexDonut/>
                </Col>
                <Col xs={12} sm={4} className="person-wrapper">
                    <AgeRange />
                </Col>
                <Col xs={12} sm={4} className="person-wrapper">
                    <NetIncomeDonut />
                </Col> 

            </Row>
        </React.Fragment>
    )}
}
 
Analytics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Analytics);