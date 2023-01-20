import React, { Component } from 'react';
import { MDBBtn, MDBContainer } from "mdbreact";
import Avatar from 'react-avatar-edit'
import axios from 'axios';
export default class Profilepic extends Component  {


  constructor(props) {
    super(props)
    this.hide = this.hide.bind(this);
    this.check = this.check.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.state = {
      avatar: false,
      preview: '/images/XXfdOcsLvZ.png',
    }
    this.onCrop = this.onCrop.bind(this)
  }
  
  
  onCrop(preview) {
    if(preview != "/images/FAfpplRc47.png"){
    this.setState({preview})}
  }
  componentDidMount() {
    axios.get("/profil").then(response => {
       if(response.data != "nothing"){      
      this.setState({preview: response.data[0]['source']})
       }
      if(this.state.preview != '/images/XXfdOcsLvZ.png'){
        this.setState({
          avatar: !this.state.avatar,
        });
      }
      })

  }
  renderAvatar (){
    if(this.state.avatar == false){
    return <Avatar
    imageWidth={300}
    onCrop={this.onCrop}
  />
    }
  
}
  hide() {
    const obj = {
      profile: this.state.preview,
    };
    axios.post('/profile', obj)
              .then(res =>{});
    this.setState({
      avatar: !this.state.avatar,
    });
}
check(){
  if(!this.state.avatar){
    return"Done";
  }
  else{
    return"Edit";
  }
}

  
  render () {
    return (
      <div>
        <div style={{display:'inline-flex'}}>
        <img  src= {this.state.preview} alt="Profile pic" style={{width:'200px', height:'200px'}} />
        {this.renderAvatar()}
        </div>
        <div style={{margin:'20px 50px'}}> 
        <MDBBtn outline onClick={this.hide} color="warning" style={{borderRadius:'20px'}}>{this.check()}</MDBBtn>
        </div>
      </div>
    )
  }
}