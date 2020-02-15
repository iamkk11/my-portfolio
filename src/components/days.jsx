import React, {Component} from 'react';
import {Bar} from 'britecharts-react';
import {ActivityIndicator} from './activityIndicator';

export class Days extends Component {
    constructor(props){
        super(props)
        this.state={
            daysLeftData:[],
            ai:true
        }
    }

    fetchDaysLeftData = (token) =>{
        const apiUrl = '/api/days'
        fetch(apiUrl,{
            method:'GET',
            headers:{
                'Authorization':token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success === true){
                this.setState({daysLeftData:response.data,ai:false})
            }
            else{
                this.setState({ai:false})
            }
        })
        .catch((error) => {
            this.setState({ai:false})
            console.log(error)
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
            <div>
                <Bar
                    data={this.state.daysLeftData}
                    enableLabels = {true}
                    labelsNumberFormat = '1'
                    labelsSize = '15'
                    isAnimated = {true}
                    colorSchema = {['orange','GoldenRod','Khaki','PowderBlue','Tan','Yellow']}
                />
            </div>
        )
    }
}
