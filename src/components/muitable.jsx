import React from "react";
import {Modal,Container,Row,Col,Button as ReactBootstrapButton} from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoadingOverlay from 'react-loading-overlay';
import {RingLoader} from 'react-spinners';
import {Button} from 'reactstrap';
import CustomToolbar from "./CustomToolbar";
import CustomToolbarSelect from "./CustomToolbarSelect";
import CustomRow from './customRow';

const getColor = (status)=>{
  if (status === 'Exceeded'){
    return 'danger'
  }
  else if (status === 'Less than 15'){
    return 'warning'
  }
  else if (status === 'More than 15'){
    return 'success'
  }
  else {
    return 'secondary'
  }
}

const mongoToHTMLDate = (mongodate)=>{
  const curr = new Date(mongodate);
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substr(0,10);
  return date
}

class Muitable extends React.Component {
  state={
    data:[],
    details:'',
    loader:true,
    showHover:false,
    show:false,
  }

  registerTenant=()=>{
    this.setState({ringloader:true});
    const {username,phone,startDate,duration,unit_id} = this.state.details;
    const data = JSON.stringify({username,phone,startDate,duration,unit_id});
    const endpoint = '/api/modal-update'
    fetch(endpoint,{
    method:'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:data
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.success===true){
        this.handleClose();
      }
      else{
        alert('Error occured');
      }
    })
    .catch((error) => {
      alert('Error occured');
    })
  }

  handleOpen=(username)=>{
    this.getDetails(username);
    this.setState({show:true})
  }

  handleClose=()=>{
    this.setState({show:false})
  }

  getDetails = (username)=>{
    const data = JSON.stringify({username:username});
    const apiUrl = '/api/modal'
    fetch(apiUrl,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:data
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success === true){
          response.user.startDate= mongoToHTMLDate(response.user.startDate);
          response.user.endDate= mongoToHTMLDate(response.user.endDate);
          this.setState({details:response.user})
        }
        else {
          alert('Error getting user')
        }
    })
    .catch((error) => {
      this.setState({progress:false})
      alert(error)
    })
  }

  getTableData=()=>{
    const apiUrl = '/api/mytenants';
    fetch(apiUrl,{
      method:'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.success === true){
        this.setState({data:response.data,loader:false})
      }
      else {
        this.setState({data:[],loader:false})
      }
    })
    .catch((error) => {
      this.setState({loader:false})
    })
  }

  mouseEnter=()=>{
    this.setState({showHover:true})
  }

  mouseLeave=()=>{
    this.setState({showHover:false})
  }

  handleChange = name => event=>{
    const {details} = this.state;
    const currentState = details;
    currentState[name] = event.target.value;
    this.setState({details:currentState});
  };

  componentDidMount=()=>{
    this.getTableData()
  }

  render() {
    const {classes} = this.props;
    const {details} = this.state;
    const columns = [{name:"Unit",options:{filter:false}},{name:"Email",options:{filter:false}},{name:"Name",options:{filter:false}},{name:"Phone",options:{filter:false}},
      {
        name: "Due Days",
        options: {
          filter: true,
          filterType:'checkbox',
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',maxHeight:30,maxWidth:1}} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
                <div>
                  <Button color={getColor(value)} style={{width:105}} >
                    <Typography style={{fontSize:11}}>{value}</Typography>
                  </Button>
                </div>
                {
                  this.state.showHover &&
                  <div style={{paddingLeft:10}} >
                    <CustomRow selectedRow={tableMeta.rowIndex} data={this.state.data} />
                  </div>
                }
              </div>
            );
          },

        }
      }
    ]

    const options = {
      responsive: "stacked",
      elevation: 2,
      rowsPerPage:100,
      customToolbar: () => { //adding send reminder portion
        return (
          <CustomToolbar />
        );
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} data={this.state.data} getTableData = {this.getTableData}/>
      ),
      onRowClick: (rowData,rowMeta) => {
        const username = rowData[1];
        this.handleOpen(username);
      },

    };

    return (
      <div>
        <LoadingOverlay active={this.state.loader} spinner={<RingLoader size={150} color={'peru'}/>} text='loading...'>
          <MUIDataTable
            title={<Typography style={{fontWeight:'bold',fontSize:17,color:'grey'}}>Tenants</Typography>}
            data= {this.state.data}
            columns={columns}
            options={options}
          />
        </LoadingOverlay>
        <Modal scrollable show={this.state.show} onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                  <Container>
                      <Row>
                        <Typography>{details.name}</Typography>
                      </Row>
                  </Container>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height:300}}>
              <Row>
                <Col xs={12} md={{ span: 4}}>
                  <form>
                    <TextField
                      id="outlined-start-date"
                      label="Start Date"
                      type='date'
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={details.startDate}
                      onChange={this.handleChange('startDate')}
                      InputLabelProps={{shrink: true,fontSize:15}}
                      InputProps={{className: classes.inputBox}}
                    />
                  </form>
                </Col>
                <Col xs={12} md={{span:4,offset:2}}>
                  <form>
                    <TextField
                      id="outlined-start-date"
                      label="End Date"
                      type='date'
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={details.endDate}
                      disabled={true}
                      InputLabelProps={{shrink: true,fontSize:15}}
                      InputProps={{className: classes.inputBox}}
                    />
                  </form>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={4} md={{span:4}}>
                    <form>
                      <TextField
                        id="outlined-phone"
                        label="Phone"
                        value={details.phone}
                        onChange={this.handleChange('phone')}
                        type="tel" 
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        placeholder="255 XXX XXX XXX"
                        InputLabelProps={{className: classes.inputLabelProps}}
                        InputProps={{className: classes.inputBox}}
                      />
                    </form>
                </Col>
                <Col xs={12} md={{span:4,offset:2}}>
                  <form spellcheck="false">
                    <TextField
                      id="outlined-room"
                      label="Room"
                      className={classes.textField}
                      value={details.unit_id}
                      onChange={this.handleChange('unit_id')}
                      margin="normal"
                      variant="outlined"
                      placeholder="Enter room number"                                    
                      InputLabelProps={{className: classes.inputLabelProps}}
                      InputProps={{className: classes.inputBox}}
                    />
                  </form>
                </Col>
              </Row>
              <Row>
                <Col xs={6} sm={4} md={{span:4}} >
                  <form spellcheck="false">
                    <TextField
                      id="outlined-months"
                      label="No of months"
                      type='Number'
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={details.duration}
                      onChange={this.handleChange('duration')}
                      InputLabelProps={{className: classes.inputLabelProps}}
                      InputProps={{className: classes.inputBox}}
                    />
                  </form>
                </Col>
                <Col xs={6} sm={4} md={{span:4,offset:2}} >
                  <form spellcheck="false">
                    <TextField
                      id="outlined-days"
                      label="Days Left"
                      type='Number'
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={details.daysLeft}
                      onChange={this.handleChange('duration')}
                      InputLabelProps={{className: classes.inputLabelProps}}
                      InputProps={{className: classes.inputBox}}
                      disabled={true}
                    />
                  </form>
                </Col>
              </Row>
            </Modal.Body>
          <Modal.Footer>
            <ReactBootstrapButton variant="info" onClick={this.handleClose}>
              Cancel
            </ReactBootstrapButton>
            <ReactBootstrapButton variant="info" onClick={this.registerTenant}>
              Update
            </ReactBootstrapButton>        
          </Modal.Footer>
        </Modal> 
      </div>
    );
  }
}

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
});

Muitable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Muitable)