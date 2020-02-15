import React, { Component } from 'react';
import {Container,Row,Col,Accordion,Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {AgeRange} from './ageRange';
import {SexDonut} from './SexDonut';
import {NetIncomeDonut} from './netIncomeDonut';
import SimpleBarChart from './daysBar';
import {Cashflow} from './cashflow';

class Analytics extends Component {
    render() {
    return (
        <Container>
            <Accordion>
                <Card border="white" bg='light'>
                    <Accordion.Toggle as={Card.Header}>
                        <Typography variant="h5" color='primary' style={{fontSize:17}}>
                            Room VS Days Left
                        </Typography>
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        <Card.Body>
                        <Row>
                            <SimpleBarChart />
                        </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card border="white" bg='light'>
                    <Accordion.Toggle as={Card.Header}>
                        <Typography variant="h5" color='primary' style={{fontSize:17}}>
                            Cashflow
                        </Typography>
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        <Card.Body>
                        <Row>
                            <Cashflow />
                        </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card border="white" bg='light'>
                    <Accordion.Toggle as={Card.Header}>
                        <Typography variant="h5" color='primary' style={{fontSize:17}}>
                            Tenant Analytics
                        </Typography>
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        <Card.Body>
                            <Row>
                                <Col >
                                    <SexDonut/>
                                </Col>
                                <Col >
                                    <AgeRange />
                                </Col>
                                <Col >
                                    <NetIncomeDonut />
                                </Col> 
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Container>
    )}
}
 
Analytics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Analytics;