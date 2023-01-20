import React, { Component } from "react";
import MessageList from "./chatting/MessageList";
import MessageBox from './chatting/MessageBox';
import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Paper from '@material-ui/core/Paper';

export default class TeacherChat extends Component {
  constructor(props) {
    super(props);
    this.chat = this.chat.bind(this);
    this.selected = this.selected.bind(this);
    this.state = {
      newteacher:false,
      id:0,
      loading:true,
      users: [],
      preview: '/images/Clc1mIm5Yc.png',
    };
    axios.get("/check").then(response => {
     
      this.setState({newteacher: response.data})
      })
    
  }
  componentWillMount(){
    axios.get("/checklistchat").then(response => {
      this.setState({users:response.data})
      
    });
  }
  onChan = () => {
    this.setState({
      loading:false,
    })
  }
  back = () => {
    if(this.state.newteacher){
    this.props.onanychange()
    }
    else{
      this.props.stop()
    }
  }
  
// listofstudents(){

//   return <ChattingList onAnyChange={this.onChange}/>
    
//     // if(!this.state.list && this.state.loading){
//     //   return(
//     //     <>
//     // <div className="spinner-grow text-primary" role="status" style={{ margin: '0 0 0 200px'}}>
//     //   <span className="sr-only">Loading...</span>
//     // </div>
//     // </>
//     //   )
//     // }
// }
chat(){
    if(this.state.id != 0){
        return(
            <div key={this.state.id}>
            <div className="container">
            <div className="columns">
            <div className="column is-3"></div>
            <div key={this.state.id} className="scrollabe column is-6">
                <MessageList data={this.state.id}  />
            </div>
            </div>
            <div className="columns">
            <div className="column is-3"></div>
            <div key={this.state.id} className="column is-6">
                <MessageBox data={this.state.id} />
            </div>
            </div>
            </div>
        </div>
        )
    }
}
selected(e){
  this.setState({
    id:(e.currentTarget.getAttribute('value'))
});
}
render() {
      let userslist = this.state.users.map((user) => {
        return (
          <div key={user[0]['id']}>
          <li key={user[0]['id']}  style={{ margin: '10px 0 0 0'}} >
              <div onClick={this.selected} id={user[0]['id']}  key={user[0]['id']}  value={user[0]['id']} style={{cursor:'pointer', margin:'20px 0 20px 0'}}>
              <img  src= {user[0]['source']?user[0]['source']:this.state.preview}  alt="Profile pic" style={{width:'80px', height:'80px'}} />
              <div key={user[0]['id']} style={{ margin: '0px 0px 0px 30px',display:'inline-block', cursor:'pointer'}}><h3 style={{cursor:'pointer'}} > {user[0]['name']}</h3></div>
              </div>
          </li>
          <hr style={{border: '1px solid deepskyblue', borderRadius: '5px'}}/> 
          </div> 
        )
      });
        return (
          <Paper style={{ display: 'flex', flexDirection: 'row', borderRadius:'10px', height:'850px', width:'100%' }} >
            <div style={{width:'30%', height:'100%'}}>
                <MDBBtn size='sm' color='success' style={{borderRadius:'20px'}} onClick={this.back}><MDBIcon icon="angle-left" style={{marginRight:'5px'}}/>back</MDBBtn>
                <hr style={{width:'270px', margin: '5px 0px 0px 25px'}}/>
              <h3 style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 0 0', overflow: 'auto', color:'blue'}}>Contacts</h3>
              <hr/>
              <ul style={{listStyleType: 'none'}} >
              {userslist}
              </ul>
            </div>
            <div style={{width:'70%', height:'100%', borderLeft:'solid 1px', overflow: 'auto'}}>
              {this.chat()}
            </div>
          </Paper>
        );
    }
}
