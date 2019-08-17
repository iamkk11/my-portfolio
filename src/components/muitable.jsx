import React from "react";
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import LoadingOverlay from 'react-loading-overlay';
import {RingLoader} from 'react-spinners';
import {Button} from 'reactstrap';
import CustomToolbar from "./CustomToolbar";
import CustomToolbarSelect from "./CustomToolbarSelect";

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

export default class Muitable extends React.Component {
  state={
    data:[],
    loader:true,
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

  componentDidMount=()=>{
    this.getTableData()
  }

  render() {

    const columns = [{name:"Unit",options:{filter:false}},{name:"Email",options:{filter:false}},{name:"Name",options:{filter:false}},{name:"Phone",options:{filter:false}},
      {
        name: "Due Days",
        options: {
          filter: true,
          filterType:'checkbox',
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Button color={getColor(value)} style={{width:105}} >
                {value}
              </Button>
            );
          }
        }
      }
    ]

    const options = {
      responsive: "stacked",
      elevation: 2,
      rowsPerPage:100,
      customToolbar: () => {
        return (
          <CustomToolbar />
        );
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} data={this.state.data} getTableData = {this.getTableData}/>
      ),
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
      </div>
    );
  }
}