import React, { Component } from 'react';
import './App.css';
import Chart from './chart'
 const ws = new WebSocket('ws://chegi.xyz:80')

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      haslighton:false,
      ispaint:false,
      operation:'observe',
      light:'110',
      lightArr:[],
      timeArr:[],
      i:0
    }
  }
  componentDidMount(){
       var i=this.state.i
       ws.onmessage=data=>{
         console.log(data.data);
         this.receiveOn(data);
         if(JSON.parse(data.data).light){
          i++;
          if(i<=20){
            this.setState({timeArr:[...this.state.timeArr,i]});
            this.setState({lightArr:[...this.state.lightArr,JSON.parse(data.data).light]})  
          }
           this.setState({light:JSON.parse(data.data).light})
         }else{
           this.receiveOn(data)
         }
       }
     
   
  }
  receiveOn(data){
       if(data.data==='0')
      { 
        this.setState({haslighton:true})
      }
      if(data.data==='1'){
        this.setState({haslighton:false})
      }
  }
  on(){
    if(ws.readyState===1)
    ws.send(0)
   
  }
  off(){
    ws.send(1)
   }
/*
  testpaint(){
    ws.send(JSON.stringify({light:12}))
  }
*/
  paint(){
    this.setState({ispaint:true})
    console.log(this.state.timeArr)
  }
  repaint(){
    window.location.reload()
  }
  render() {
    return (
      <div className="App">
        <h2>物联网远程控灯</h2>
        <a href='https://github.com/qumuchegi?tab=repositories'>你可以在github查看项目源码</a>
        {
          this.state.operation==='observe' ? 
          <div id='result'>
            <div id='h3'>实时显示亮度</div>
            <div id='h4'>操作结果</div>
            <div id="light">LED亮度：
            <span id="number">{this.state.light}</span>
            Lux
            </div>
            {
              this.state.ispaint?
              <div>
                  <Chart timeArr={this.state.timeArr} lightArr={this.state.lightArr}/>
                  <button id='paint' onClick={()=>this.repaint()}>
                   重绘
                  </button>
              </div>
              :
              <div>
              <button id='paint' onClick={()=>{
                this.paint()
              }}>
                绘图
              </button>
              {
                /* 
                <button onClick={()=>this.testpaint()}>
                tset
              </button>
                */
              }
              </div>
            }
          </div>
        :
          <div>
            <div id='h3'>实时控制LED</div>
            <div id='h4'>操作结果</div>
            <div id='hason'>
                {
                  this.state.haslighton? <span>已经点亮</span> : <span>已经熄灭</span>
                }
            </div>
            <div id="button-container">
              <div id='button' onClick={()=>this.on()}>点亮</div>
              <div id='button' onClick={()=>this.off()}>熄灭</div> 
            </div>
          </div>
        }
        <div id='nav'>
         <div onClick={()=>{this.setState({operation:'observe'})}} id={this.state.operation==='observe'?'clicked':null}>实时光照</div>
         <div onClick={()=>{this.setState({operation:'control'})}} id={this.state.operation==='control'?'clicked':null}>控制LED</div>
        </div>
       </div>
    );
  }
}

export default App;
