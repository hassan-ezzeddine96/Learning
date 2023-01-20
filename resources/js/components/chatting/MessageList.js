import React, {Component} from 'react';
import Message from './Message';
import _ from 'lodash';
import { database } from '../firebasecon';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      id:this.props.data,
      key:'',
      first:'',
    };
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.data !== this.props.data) {
  //     this.setState({id:this.props.data})
  //   }}
  componentWillMount(){
    const s={id:this.props.data}
    axios.post("/checkchat",s).then(response => {
      
      this.setState({key:response.data['key']})
      let app = database.ref('chat/'+ this.state.key +'/');
      app.off();
      setTimeout(async () => {
        app.on('value', snapshot => {
          this.getData(snapshot.val());
        });
      },1000);
    });
    axios.post("/allx", s).then(response => {
      this.setState({first: response.data[0][0]['firstname']
                  });  
      })
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }
  render() {
    let messageNodes = this.state.messages.map((message) => {
      return (
            <Message name={this.state.first} me={message.key} id={message.userid} message = {message.message} />
      )
    });
    return (
      <div key={this.state.id} className="chat-history">
        <ul key={this.state.id}  style={{listStyleType: 'none'}}>
        {messageNodes}
        </ul>
      </div>
    );
  }
}

export default MessageList