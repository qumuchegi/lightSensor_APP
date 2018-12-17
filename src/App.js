import React, { Component } from 'react';
import './App.css';
const ws = new WebSocket('ws://chegi.xyz:80')

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      haslighton:false,
      light:''
    }
  }
  componentDidMount(){
       ws.onmessage=data=>{
         console.log(data.data)
         if(JSON.parse(data.data).light){
          console.log('接收光照度：',JSON.parse(data.data).light)
          this.setState({light:JSON.parse(data.data).light})
         }
       }
  }
  receiveOn(data){
      console.log(data.data)
      if(data.data==='0')
      { 
        this.setState({haslighton:true})
      }else{
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
  render() {
    return (
      <div className="App">
        <div>
          <p>物联网远程控灯</p>
          <h3>实时显示亮度和控制LED</h3>
        </div>
 
        <div id="result">
          <h4>操作结果</h4>
          <div id="light">亮度：
          <span id="number">{this.state.light}</span>
          Lux
          </div>
        </div>  
     
        <div id="button-container">
          <div id='button' onClick={()=>this.on()}>点亮</div>
          <div id='button' onClick={()=>this.off()}>熄灭</div> 
        </div>
       </div>
    );
  }
}

export default App;
