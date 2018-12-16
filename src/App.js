import React, { Component } from 'react';
import './App.css';
const ws = new WebSocket('ws://chegi.xyz:80')
//const socket = client('ws://chegi.xyz:9091')

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

    //socket.emit('send',{light:'2'})///
    //ws.send(JSON.stringify({light:'8'}))
    //console.log(ws.readyState)
    if(ws.readyState===1)
    ws.send(0)
    //ws.onmessage=data=>this.receiveOn(data)
  }
  off(){
    ws.send(1)
    //ws.onmessage=data=>this.receiveOn(data)
   }
  render() {
    return (
      <div className="App">
        <div>
          <p>物联网远程控灯</p>
        </div>
 
        <div id="result">
          <h4>操作结果</h4>
          {
            this.state.haslighton?<h3 id='on'>已经点亮了！！</h3>:<h3 id='off'>已经熄灭！！</h3>
          }
          <div id="light">亮度：{this.state.light}</div>
        </div>  
     
        <div>
          <div id='button' onClick={()=>this.on()}>点亮</div>
          <div id='button' onClick={()=>this.off()}>熄灭</div> 
        </div>
       </div>
    );
  }
}

export default App;
