import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import 'react-widgets/dist/css/react-widgets.css';
import axios from 'axios';

export default class Oldteacher extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.add = this.add.bind(this);
        this.schedule = this.schedule.bind(this);
        this.chat = this.chat.bind(this);
        this.state = {
        first: '',
        last: '',
        phone: '',
        age: '',
        email: '',
        preview: '/images/XXfdOcsLvZ.png',
         };
      }
      schedule  () {
        this.props.schedule();
      };
      chat  () {
        this.props.chat();
      };
      update  () {
        this.props.update();
      };
      add  () {
        this.props.add();
      };
        componentDidMount(){
          axios.get("/others").then(response => {
               
                  this.setState({first: response.data[0]['firstname'],
                                last: response.data[0]['lastname'],
                                phone: response.data[0]['phonenumber'],
                                age: response.data[0]['age'],
                                info: response.data[0]['extra_info'],
                                email: response.data[0]['email'],
                            
                            });
          // console.log(this.state);
          })
          axios.get("/profil").then(response => {
            if(response.data != "nothing"){      
           this.setState({preview: response.data[0]['source']})
            }
           })
      }
    render() {
        return (
            <div className='cont' style={{ margin:'0 0 0 -2px', width:'100%' }}>
            <div className='UserCard' id='blogcard'>
                <div className='UserCardTop'>
                <img  src= {this.state.preview}  alt="Profile pic" />
                </div>
                <div className='UserCardBottom'>
                    <h2 style={{ margin:'43px 0px 0px 160px'}}>{this.state.first} {this.state.last}</h2>
                    <h5 style={{ margin:'13px 0px 0px 160px'}}>{this.state.email}</h5>
                    <h5 style={{ margin:'13px 0px 0px 160px'}}>{this.state.age} years old</h5>
                </div>
                <div className='UserCardUpdate'>
                <MDBBtn
                    color="warning"
                    className="mb-2"
                    onClick={this.update}
                    style={{width:'172px'}}
                >
                    Update Info
                    <i class="fas fa-wrench white-text" style={{margin:'0 0 0 10px' }}></i>
                </MDBBtn>
                <MDBBtn
                    color="primary"
                    className="mb-2"
                    onClick={this.add}
                    style={{width:'172px'}}
                >
                    Add Course
                    <i class="fas fa-book-open white-text" style={{margin:'0 0 0 10px' }}></i>
                </MDBBtn>
                <MDBBtn
                    color="success"
                    className="mb-2"
                    onClick={this.chat}
                    style={{width:'172px'}}
                >
                    Chat
                    <i class="fab fa-rocketchat white-text" style={{margin:'0 0 0 10px' }}></i>
                </MDBBtn>
                <MDBBtn
                    color="info"
                    className="mb-2"
                    onClick={this.schedule}
                    style={{width:'172px'}}
                >
                    Schedule
                    <i class="far fa-calendar-check white-text" style={{margin:'0 0 0 10px' }}></i>
                </MDBBtn>
                </div>
            </div>
        </div>
        );
    }
}
