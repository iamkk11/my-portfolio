import React, { Component } from 'react';
import {Container,Row,Col,Jumbotron,Accordion,Card} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import swal from '@sweetalert/with-react';
import {RingLoader} from 'react-spinners';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    inputBox:{
        width:300,
        fontSize:15,
    },
    inputLabelProps:{
        fontSize:15,
    },
    jumbo:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:10,
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttons:{
        display:'flex',
        flexDirection: 'row',
        paddingBottom: 9
    },
    buttomButtons:{
        display:'flex',
        flexDirection: 'column',
    },
});

const role = [
    {
        value: 'user',
        label: 'User',
    },
    {
        value: 'admin',
        label: 'Admin',
    },
];

const sex = [
    {
        value: 0,
        label: '',
    },
    {
        value: 1,
        label: 'Male',
    },
    {
        value: 2,
        label: 'Female',
    },
];

const ageRanges = [
    {
        value: 0,
        label: '',
    },
    {
        value: 1,
        label: '20-25',
    },
    {
        value: 2,
        label: '25-30',
    },
    {
        value: 3,
        label: '30-35',
    },
    {
        value: 4,
        label: 'Above 35',
    },
];

const incomeRanges = [
    {
        value: 0,
        label: '',
    },
    {
        value: 1,
        label: 'TZS 200,000-500,000',
    },
    {
        value: 2,
        label: 'TZS 500,000-1000,000',
    },
    {
        value: 3,
        label: 'TZS 1000,000-1,500,000',
    },
    {
        value: 4,
        label: 'Above TZS 1,500,000',
    },
];

  
class AddTenant extends Component {
    state = {
        role:'user',
        sex:'1',
        ageRange:'1',
        incomeRange:'',
        name:'',
        username:'',
        phone:'',
        startDate:'',
        duration:'',
        unit_id:'',     

        loader:false,
        alertSweet:'',

        emailError:false,
        roomError:false,
        startDateError:false,
        durationError:false,
    };

    sweetAlert=(title,text,icon)=>{
        swal({title: title,text: text,icon: icon})
    }

    handlePhoneNo = () =>{
        const {phone} = this.state;
        if(phone ===''){
            alert('Enter phone number in this format: 255 XXX XXX XXX. e.g 255714876321');
        }
        else{
            const first3Digits = phone.slice(0,3)
            const phoneNoLength = phone.length;
            if (phoneNoLength === 12 && first3Digits === '255'){
              this.handleSubmitButton();
            }
            else{
              alert('Enter phone number in this format: 255 XXX XXX XXX. e.g 255714876321');
            }
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    registerTenant=()=>{
        const {role,name,phone,username,startDate,duration,unit_id,sex,ageRange,incomeRange} = this.state;
        const data1 = JSON.stringify({role,name,phone,username,startDate,duration,unit_id,sex,ageRange,incomeRange});
        const data2 = JSON.stringify({role,name,phone,username});
        const endpoint = '/api/register'
        fetch(endpoint,{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:this.state.role === 'user' ? data1 : data2
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success===true){
                this.setState({loader:false,alertSweet:this.sweetAlert('Registration Successful','You have successfully registered user','success')})
            }
            else if(response.duplicate===true){
                this.setState({loader:false,alertSweet:this.sweetAlert('Error','Record already exists','error')})
            }
            else{this.setState({loader:false,alertSweet:this.sweetAlert('Failure','Error while registering user','error')})}
        })
        .catch((error) => {
          this.setState({loader:false,alertSweet:this.sweetAlert('Failure','Error during fetch','error')})
        })
    }

    handleSubmitTenant = ()=>{
        const {username,unit_id,startDate,duration} = this.state;
        this.setState({loader:true})
        if (username ===''){
            this.sweetAlert('Missing field','Email is empty','error')
            this.setState({emailError:true,loader:false})
        }
        else if (unit_id ===''){
            this.sweetAlert('Missing field','Unit id is empty','error')
            this.setState({roomError:true,loader:false})
        }
        else if (startDate ===''){
            this.sweetAlert('Missing field','Startdate is empty','error')
            this.setState({startDateError:true,loader:false})
        }
        else if (duration ===''){
            this.sweetAlert('Missing field','Duration is empty','error')
            this.setState({durationError:true,loader:false})
        }
        else if (username==='' && unit_id==='' && startDate==='' && duration===''){
            this.sweetAlert('Missing fields','Unit id, Start date, duration & username are missing','error')
            this.setState({emailError:true,roomError:true,startDateError:true,durationError:true,loader:false})
        }
        else{
            this.registerTenant();
        }
    }

    handleSubmitAdmin = ()=>{
        const {username,name} = this.state;
        this.setState({loader:true})
        if (username ===''){
            this.sweetAlert('Missing field','Email is empty','error')
            this.setState({emailError:true,loader:false})
        }
        else if(name===''){
            this.sweetAlert('Missing field','Name is empty','error')
        }
        else{
            this.registerTenant();
        }
    }

    handleSubmitButton = ()=>{ 
        if (this.state.role === 'admin'){
            this.handleSubmitAdmin();
        }
        else {
            this.handleSubmitTenant();
        }
    }

    _onKeyPress=(event)=>{
        if (event.charCode === 13) { 
          event.preventDefault();
          this.handleSubmitButton()
        } 
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Container>
                    <Jumbotron className={classes.jumbo}>
                        <Typography variant="diaplay 1" gutterBottom color='default' style={{fontSize:'12',color:'peru',fontWeight:'bold'}}>
                            User Registration Form
                        </Typography>
                    </Jumbotron>

                    <Accordion>
                        <Card border="white" bg='light'>
                            <Accordion.Toggle as={Card.Header}>
                                <Typography variant="h5" color='primary' style={{fontSize:17}}>
                                    Tenant Info
                                </Typography>
                            </Accordion.Toggle>
                            <Accordion.Collapse>
                                <Card.Body>
                                    <Row>
                                        <Col xs={6} sm={4} md={4} >
                                            <form autoComplete="off" spellcheck="false">
                                                <TextField
                                                    id="outlined-select-role"
                                                    select
                                                    className={classes.textField}
                                                    value={this.state.role}
                                                    onChange={this.handleChange('role')}
                                                    helperText="User role?"
                                                    margin="normal"
                                                    variant="outlined"
                                                    placeholder="Role"
                                                    InputLabelProps={{className: classes.inputLabelProps}}
                                                    InputProps={{className: classes.inputBox}}
                                                    onKeyPress={this._onKeyPress}
                                                    SelectProps={{native:true}}
                                                >
                                                    {role.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>
                                            </form>
                                        </Col>
                                        <Col xs={12} md={{ span: 4,offset:4}}>
                                            <form autoComplete="off" spellcheck="false">
                                                <TextField
                                                    id="outlined-name"
                                                    label="Full Name"
                                                    className={classes.textField}
                                                    value={this.state.name}
                                                    onChange={this.handleChange('name')}
                                                    margin="normal"
                                                    variant="outlined"
                                                    placeholder="Enter Full Name"                                    
                                                    InputLabelProps={{className: classes.inputLabelProps}}
                                                    InputProps={{className: classes.inputBox}}
                                                    onKeyPress={this._onKeyPress}
                                                />
                                            </form>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} sm={4} md={4}>
                                            <form>
                                                <TextField
                                                    required
                                                    id="outlined-phone"
                                                    label="Phone"
                                                    value={this.state.phone}
                                                    onChange={this.handleChange('phone')}
                                                    type="tel" 
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                    placeholder="255XXX XXX XXX"
                                                    InputLabelProps={{className: classes.inputLabelProps}}
                                                    InputProps={{className: classes.inputBox}}
                                                    onKeyPress={this._onKeyPress}
                                                />
                                            </form>
                                        </Col>
                                        <Col xs={12} md={{ span: 4,offset:4}}>
                                            <form>
                                                <TextField
                                                    required
                                                    id="outlined-email-input"
                                                    label="Email"
                                                    className={classes.textField}
                                                    type="email"
                                                    autoComplete="email"
                                                    margin="normal"
                                                    variant="outlined"
                                                    value={this.state.username}
                                                    onChange={this.handleChange('username')}
                                                    onFocus={()=>this.setState({emailError:false})}
                                                    placeholder="Enter a valid email address"
                                                    InputLabelProps={{className: classes.inputLabelProps}}
                                                    InputProps={{className: classes.inputBox}}
                                                    error={this.state.emailError}
                                                    onKeyPress={this._onKeyPress}
                                                />
                                            </form>
                                        </Col>
                                    </Row>
                                    <React.Fragment>
                                        {this.state.role==='user' ? (
                                        <React.Fragment>
                                            <Row>
                                                <Col xs={6} sm={4} md={4}>
                                                    <form spellcheck="false">
                                                        <TextField
                                                            required
                                                            id="outlined-room"
                                                            label="Room"
                                                            className={classes.textField}
                                                            value={this.state.unit_id}
                                                            onChange={this.handleChange('unit_id')}
                                                            onFocus={()=>this.setState({roomError:false})}
                                                            margin="normal"
                                                            variant="outlined"
                                                            placeholder="Enter room number"                                    
                                                            InputLabelProps={{className: classes.inputLabelProps}}
                                                            InputProps={{className: classes.inputBox}}
                                                            error={this.state.roomError}
                                                            onKeyPress={this._onKeyPress}
                                                        />
                                                    </form>
                                                </Col>
                                                <Col xs={12} md={{ span: 4,offset:4}}>
                                                    <form>
                                                        <TextField
                                                            id="outlined-start-date"
                                                            required
                                                            label="Start Date"
                                                            type='date'
                                                            className={classes.textField}
                                                            margin="normal"
                                                            variant="outlined"
                                                            value={this.state.startDate}
                                                            onChange={this.handleChange('startDate')}
                                                            InputLabelProps={{shrink: true,fontSize:15}}
                                                            InputProps={{className: classes.inputBox}}
                                                            onKeyPress={this._onKeyPress}
                                                            error={this.state.startDateError}
                                                            onFocus={()=>this.setState({startDateError:false})}
                                                        />
                                                    </form>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6} sm={4} md={4} >
                                                    <form spellcheck="false">
                                                        <TextField
                                                            id="outlined-months"
                                                            label="No of months"
                                                            type='Number'
                                                            className={classes.textField}
                                                            margin="normal"
                                                            variant="outlined"
                                                            value={this.state.duration}
                                                            onChange={this.handleChange('duration')}
                                                            InputLabelProps={{className: classes.inputLabelProps}}
                                                            InputProps={{className: classes.inputBox}}
                                                            onKeyPress={this._onKeyPress}
                                                            error={this.state.durationError}
                                                            onFocus={()=>this.setState({durationError:false})}
                                                        />
                                                    </form>
                                                </Col>
                                                <Col xs={12} md={{ span: 4,offset:4}}>
                                                    <form autoComplete="off" spellcheck="false">
                                                        <TextField
                                                            id="outlined-select-incomerange"
                                                            select
                                                            label='Income'
                                                            className={classes.textField}
                                                            value={this.state.incomeRange}
                                                            onChange={this.handleChange('incomeRange')}
                                                            helperText="Income Range"
                                                            margin="normal"
                                                            variant="outlined"
                                                            InputLabelProps={{className: classes.inputLabelProps}}
                                                            InputProps={{className: classes.inputBox}}
                                                            onKeyPress={this._onKeyPress}
                                                            SelectProps={{native:true}}
                                                        >
                                                            {incomeRanges.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                            ))}
                                                        </TextField>
                                                    </form>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6} md={4} >
                                                    <form autoComplete="off" spellcheck="false">
                                                        <TextField
                                                            id="outlined-select-sex"
                                                            select
                                                            className={classes.textField}
                                                            value={this.state.sex}
                                                            onChange={this.handleChange('sex')}
                                                            helperText="Gender?"
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Sex"
                                                            InputLabelProps={{className: classes.inputLabelProps}}
                                                            InputProps={{className: classes.inputBox}}
                                                            onKeyPress={this._onKeyPress}
                                                            SelectProps={{native:true}}
                                                        >
                                                            {sex.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                            ))}
                                                        </TextField>
                                                    </form>
                                                </Col>
                                                <Col xs={12} md={{ span: 4,offset:4}}>
                                                    <form autoComplete="off" spellcheck="false">
                                                        <TextField
                                                            id="outlined-select-agerange"
                                                            select
                                                            label='Age'
                                                            className={classes.textField}
                                                            value={this.state.ageRange}
                                                            onChange={this.handleChange('ageRange')}
                                                            helperText="Age Range"
                                                            margin="normal"
                                                            variant="outlined"
                                                            InputLabelProps={{className: classes.inputLabelProps}}
                                                            InputProps={{className: classes.inputBox}}
                                                            onKeyPress={this._onKeyPress}
                                                            SelectProps={{native:true}}
                                                        >
                                                            {ageRanges.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                            ))}
                                                        </TextField>
                                                    </form>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                        ) : ''
                                    }
                                    </React.Fragment>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Row>
                        <Col xs={6} md={4}>
                            <div className={classes.buttons}>
                                <div className={classes.buttomButtons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handlePhoneNo}
                                        className={classes.button}
                                    >
                                        SUBMIT
                                        <RingLoader loading={this.state.loader} size={27} color='white' />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
  
AddTenant.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTenant)