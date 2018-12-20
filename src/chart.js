import React, { Component } from 'react';
import echarts from 'echarts'

 class Chart extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
componentDidMount(){
    var {timeArr,lightArr} = this.props
   console.log(timeArr,lightArr)
    var dom = document.getElementById('lightChart')
    var echart=echarts.init(dom)
     echart.setOption({
         xAxis: {
             type: 'category',
             boundaryGap: false,
             data: timeArr//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
         },
         yAxis: {
             type: 'value'
         },
         series: [{
             data: lightArr,//[1,2,1, 4, 9, 0,20],
             type: 'line',
             areaStyle: {}
         }]
       },true)
}
    
    render(){
        return(
            <div id="lightChart" style={{width:'100%',height:'254px',margin:'0'}}>
            </div>
        )
    }
 }
 export default Chart;