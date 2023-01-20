import React, {Component} from 'react';

export default class Message extends Component {
  constructor(props){
    super(props);
    this.state ={
      senderid:'',
      first:'',
    }
  }
  componentDidMount(){
    const obj={id: this.props.id};
      axios.post("/sender", obj).then(response => {
        this.setState({senderid: response.data , 
                    }); 
        })
}

  render(){
    return (
      <div key={this.props.me}>
      {this.props.id === this.state.senderid ? (
        <li  key={this.props.me}className="clearfix"  style={{ margin: '10px 0 0 0'}}>
        <div key={this.props.me} className="message-data align-right">
        <h2><span  key={this.props.me} className="message-data-name" >Me</span> <i className="fa fa-circle me"></i></h2>
        </div>
        <div key={this.props.me} className="message other-message float-right" >
        <h4>{this.props.message}</h4>
        </div>
        </li>
      ) : (
        <li key={this.props.me}  style={{ margin: '10px 0 0 0'}}>
            <div key={this.props.me} className="message-data">
            <h2><span key={this.props.me} className="message-data-name"><i className="fa fa-circle online"></i> {this.props.name}</span></h2>
            </div>
            <div key={this.props.me} className="message my-message" >
            <h4>{this.props.message}</h4>
            </div>
        </li>
      )}
    </div>
    )
  }
}
