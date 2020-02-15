import React, {Component} from 'react';
import {Line,Tooltip} from 'britecharts-react';
import {ActivityIndicator} from './activityIndicator';

export class Cashflow extends Component {
    constructor(props){
        super(props)
        this.state={
            lineData:{},
            ai:true
        }
    }

    fetchlineData = () =>{
        const apiUrl = '/api/cashflow'
        fetch(apiUrl,{
            method:'GET',
            headers:{'Accept':'application/json','Content-Type':'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success===true){
                this.setState({lineData:response.data,ai:false})
            }
            else{
                this.setState({ai:false})
            }
        })
        .catch((error) => {
            this.setState({lineData:{dataByTopic:[]},ai:false})
            console.log(error);
        })
    }

    componentDidMount(){
        this.fetchlineData();
    }

    render() {
        const {ai} = this.state
        if (ai){
            return <ActivityIndicator/>
        }
        return (
            <div>
                <head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/britecharts/latest/britecharts.min.css" />
                </head>
                <div>
                    <Tooltip
                        data={this.state.lineData}
                        render={renderLine}
                        topicLabel="topics"
                        title=""
                        dateFormat = 'custom'
                        // dateCustomFormat = '%b'
                        dateCustomFormat = "%B '%y"

                    />
                </div>
            </div>
        )
    }
}

const renderLine = (props) => (
    <Line
        lineCurve="basis"
        isAnimated = {true}
        lineGradient = {['#7FFFD4','orange','LightSalmon','MediumPurple','GoldenRod']}
        margin = {margin}
        grid = 'full'
        yAxisLabel = 'Amount'
        yAxisLabelPadding = {40}
        xAxisLabel = 'Month'
        xAxisFormat = 'custom'
        xAxisCustomFormat = '%b'
        {...props}
    />
)

const margin = {
    bottom:80
}