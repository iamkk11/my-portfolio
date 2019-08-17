import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import {withStyles} from "@material-ui/core/styles";
import swal from '@sweetalert/with-react';

const defaultToolbarSelectStyles = {
  iconButton: {
    // marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
    transform: "translateY(-50%)",
  },
  icon: {
    '&:hover': {
      color: 'peru',
    },
  },
};

class CustomToolbarSelect extends React.Component {

  handleDelete = ()=>{
    const {selectedRows,data} = this.props;
    const deletedArray = selectedRows.data;
    const arr = deletedArray.map(x=>x.dataIndex); // indices [0,1]
    const emails = arr.map(x=>data[x][1]);
    const data2 = JSON.stringify({usernames:emails});
    const apiUrl = '/api/delete'
    fetch(apiUrl,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:data2
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.success === true){
        this.props.getTableData()     //this updates the table after deletion
      }
      else {
        this.setState({loader:false})
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handlePasswordReset = ()=>{
    const {selectedRows,data} = this.props;
    const deletedArray = selectedRows.data;
    const arr = deletedArray.map(x=>x.dataIndex); // indices [0,1]
    const emails = arr.map(x=>data[x][1]);
    const data2 = JSON.stringify({usernames:emails});
    const apiUrl = '/api/prs'
    fetch(apiUrl,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:data2
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.success === true){
        swal({text:'Password reset!',icon:'success'})
      }
      else {
        swal({text:'Password not reset!',icon:'error'})
      }
    })
    .catch((error) => {
      console.log(error)
      swal({text:'Error fetching!',icon:'error'});
      swal.stopLoading();
      swal.close();
    })
  }

  resetPassword = ()=>{
    swal({text:'Reset password for selected users?',icon:'warning',dangerMode: true,
      buttons:{
        cancel:true,
        reset:{text:'Reset password',closeModal:false}
      } 
    })
    .then((result) => {
      if (result) {
        //clicked submit which caused resolution to result
        this.handlePasswordReset();
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title='Delete'>
          <IconButton className={classes.iconButton} onClick={this.handleDelete}>
            <DeleteIcon className={classes.icon}/>
          </IconButton>
        </Tooltip>
        <Tooltip title='Reset Password'>
          <IconButton onClick={this.resetPassword}>
            <LockOpenOutlined className={classes.icon}  />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);