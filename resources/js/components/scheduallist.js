import React, {Component} from 'react';
import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";

class SchedualList extends Component {
  constructor(props){
    super(props);
    this.selected = this.selected.bind(this);
    this.state = {
      users: [],
      preview: '/images/Clc1mIm5Yc.png',
    };
   
  }
  componentWillMount(){
    axios.get("/checklistschedual").then(response => {
      this.setState({users:response.data})
    });
  }
  selected(e){
    this.props.onAnyChange(e.currentTarget.getAttribute('value'));
  }

  render() {
    let userslist = this.state.users.map((user) => {
      return (
        <div>
        <li style={{ margin: '10px 0 0 0'}}>
            <div onClick={this.selected} value={user[0]['id']} style={{cursor:'pointer', margin:'20px 0 20px 0'}}>
            <img  src= {user[0]['source']?user[0]['source']:this.state.preview}  alt="Profile pic" style={{width:'80px', height:'80px'}} />
            <div style={{ margin: '0px 0px 0px 30px',display:'inline-block', cursor:'pointer'}}><h3 style={{cursor:'pointer'}} > {user[0]['name']}</h3></div>
            </div>
        </li>
        <hr style={{border: '1px solid deepskyblue', borderRadius: '5px'}}/> 
        </div>   
      )
    });
    return (
      <div className="chat-history">
        <h3 style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}}>Contacts</h3>
        <hr/>
        <ul style={{listStyleType: 'none'}}>
        {userslist}
        </ul>
      </div>
    );
  }
}

export default SchedualList