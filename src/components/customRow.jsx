import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AlarmOn from "@material-ui/icons/AlarmOn";
import {withStyles} from "@material-ui/core/styles";
import swal from '@sweetalert/with-react';

const defaultToolbarStyles = {
  icon: {
    '&:hover': {
      color: 'peru',
    },
  },
};

class CustomRow extends React.Component {
  reminder = ()=>{
    const {selectedRow,data} = this.props;
    const email = data[selectedRow][1];
    const data2 = JSON.stringify({username:email});
    fetch('/api/remind',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:data2
    })
    .then((response) => response.json())
    .then((response)=>{
      if (response.success === true){
        swal({text:'Reminders sent!',icon:'success'})
      }
      else {
        swal({text:'Email reminder not sent!',icon:'error'})
      }
    })
    .catch((error)=>{
      alert(error);
      swal({text:'Error fetching!',icon:'error'});
      swal.stopLoading();
      swal.close();
    })
  }

  sendReminder = ()=>{
    swal({text:'Send reminder?',icon:'warning',dangerMode: true,
      buttons:{
        cancel:true,
        reminder:{text:'Send reminder',closeModal:false}
      } 
    })
    .then((result) => {
      if (result) {
        //clicked submit which caused resolution to result
        this.reminder();
      }
    })
  }
  
  // handleClick = () => {
  //   this.sendReminder();
  // }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title='Reminder' position='center'>
          <IconButton onClick={this.sendReminder}>
            <AlarmOn className={classes.icon}  />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomRow);