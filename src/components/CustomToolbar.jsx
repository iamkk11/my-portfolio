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

class CustomToolbar extends React.Component {

  reminder = ()=>{
    fetch('/api/reminder',{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'}})
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
      console.log(error);
      swal({text:'Error fetching!',icon:'error'});
      swal.stopLoading();
      swal.close();
    })
  }

  sendReminder = ()=>{
    swal({text:'Send reminder to all tenants with 15 days or less?',icon:'warning',dangerMode: true,
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
        <Tooltip title='Reminder'>
          <IconButton onClick={this.sendReminder}>
            <AlarmOn className={classes.icon}  />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);