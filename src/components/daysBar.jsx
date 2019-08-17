import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import {ActivityIndicator} from './activityIndicator';

export default class SimpleBarChart extends React.Component {
  constructor(props){
      super(props)
      this.state={
          daysLeftData:[],
          ai:true
      }
  }

  fetchDaysLeftData = () =>{
      const apiUrl = '/api/days'
      fetch(apiUrl,{
          method:'GET',
          headers:{'Accept':'application/json','Content-Type':'application/json'}
      })
      .then((response) => response.json())
      .then((response) => {
          if (response.success === true){
              this.setState({daysLeftData:response.data,ai:false})
          }
      })
      .catch((error) => {
          this.setState({ai:false})
          console.log(error);
      })
  }

  componentDidMount(){
      this.fetchDaysLeftData()
  }

  render() {
    const {ai} = this.state
    if (ai){
      return <ActivityIndicator/>
    }
    return (
      <ResponsiveContainer width="99%" height={490}>
        <BarChart data={this.state.daysLeftData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={true} strokeDasharray="3 3" />
          <Tooltip label= 'fsdt' />
          <Legend iconSize='18'/>
          <Bar name='Days Left' dataKey="value" fill="lightSalmon" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}