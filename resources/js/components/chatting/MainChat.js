import React, { Component } from "react";
import MessageList from "./MessageList";
import MessageBox from './MessageBox';
import Paper from '@material-ui/core/Paper';



export default class MainChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.data,
      first:'',
      last:'',
    };
  }
 
  componentDidMount(){
    const obj={id: this.state.id};
    axios.post("/allx", obj).then(response => {
      this.setState({first: response.data[0]['firstname'] , 
                     last: response.data[0]['lastname']
                  });  
      })
}


    render() {
        return (
            <Paper key={this.state.id} style={{maxHeight:'400px',margin:'0px 0px 50px 0px', padding: '20px', borderRadius:'20px', overflow:'auto', width:'100%'}}>
              <Paper key={this.state.id} style={{margin:'20px 20px 30px 300px', padding: '20px', borderRadius:'20px', width:'40%', textAlign:'center'}}>
                  <h1 style={{color:'cornflowerblue'}}>Chatting</h1>
              </Paper>
            <div className="columns">
              <div className="column is-3"></div>
              <div className="scrollabe column is-6">
                <MessageList data={this.state.id} />
              </div>
            </div>
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <MessageBox data={this.state.id}  />
              </div>
            </div>
        </Paper>
        );
    }
}
