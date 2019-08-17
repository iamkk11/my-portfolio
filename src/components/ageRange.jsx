import React, {Component} from 'react';
import {Donut,Legend} from 'britecharts-react';
import {ActivityIndicator} from './activityIndicator';

export class AgeRange extends Component {
    constructor(props){
        super(props)
        this.state={
            sexData:[],
            ai:true
        }
    }

    fetchSexData = () =>{
        const apiUrl = '/api/agerange'
        const url = apiUrl;
        fetch(url,{
            method:'GET',
            headers:{'Accept':'application/json','Content-Type':'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success===true){
                this.setState({sexData:response.data,ai:false})
            }
        })
        .catch((error) => {
            this.setState({ai:false})
            console.log(error);
        })
    }

    componentDidMount(){
        this.fetchSexData()
    }

    render() {
        const {ai} = this.state
        if (ai){
            return <ActivityIndicator/>
        }
        return (
            <div>
                <Donut
                    data={this.state.sexData}
                    externalRadius={150}
                    internalRadius={80}
                    radiusHoverOffset = {30}
                    highlightSliceById = {4}
                    hasFixedHighlightedSlice = {true}
                    isAnimated = {true}
                    colorSchema = {['#7FFFD4','LightSalmon','MediumPurple']}
                />
                <Legend
                    data={this.state.sexData}
                    height={140}
                    width = {290}
                    numberFormat = '1'
                    colorSchema = {['#7FFFD4','LightSalmon','MediumPurple']}
                />
            </div>
        )
    }
}