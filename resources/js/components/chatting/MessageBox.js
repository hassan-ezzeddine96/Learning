import React, {Component} from 'react';
import trim from 'trim';
import { database } from '../firebasecon';
import { MDBInput } from 'mdbreact';

class MessageBox extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.state = {
      message: '',
      id : this.props.data,
      key:"",
      senderid:'',
    };
    const obj={id: this.state.id};
    axios.post("/sender", obj).then(response => {
      this.setState({senderid: response.data , 
                  });  
      })
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.data !== this.props.data) {
  //       this.setState({id:this.props.data})
  //   }}
  onChange(e){
      this.setState({
        message: e.target.value
      });
  }
 
  onKeyup(e){
    const s={id:this.state.id}
    axios.post("/checkchat",s).then(response => {
      this.setState({key:response.data['key']})
    });
    if(e.keyCode === 13 && trim(e.target.value) !== '' && !this.state.key){
      e.preventDefault();
      let dbCon = database.ref('chat');
      let chatid = dbCon.push();
      let messageid = chatid.push()
      messageid.set({
        message: trim(e.target.value),
        userid: this.state.senderid,
      });
      this.setState({
        message: ''
      });
      const obj={id: this.state.id,key: chatid.key};
    axios.post("/chat", obj).then(response => {
      })
    }
    else if(e.keyCode === 13 && trim(e.target.value) !== ''){
      e.preventDefault();
      let dbCon = database.ref('chat/'+ this.state.key);
      let messageid = dbCon.push()
      messageid.set({
        message: trim(e.target.value),
        userid: this.state.senderid,
      });
      this.setState({
        message: ''
      });

    }
  }
  render() {
    return (
      <form>
        <MDBInput
                  label="Type a message"
                  type="textarea"
                  onChange={this.onChange}
                  onKeyUp={this.onKeyup}
                  value={this.state.message}
                />
      </form>
    )
  }
}

export default MessageBox