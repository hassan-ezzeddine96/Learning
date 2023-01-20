import React, { Component } from "react";
import TimePicker from 'react-time-picker';
import Select from "react-dropdown-select";
import { database } from './firebasecon';
import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import _ from 'lodash';
import SchedualList from "./scheduallist";
import CurrencyInput from 'react-currency-input';
import Paper from '@material-ui/core/Paper';

export default class TeacherSchedual extends Component {
  constructor(props) {
    super(props);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.spining = this.spining.bind(this);
    this.state = {
      newteacher:false,
      me:'',
      other:'',
      fromtime: '6:00',
      totime: '6:00',
      days : [],
      day : [],
      price: '',
      key:"",
      id:'',
      list:false,
      flag:['1'],
      messages:[],
      users: [],
      preview: '/images/Clc1mIm5Yc.png',
    };
    axios.get("/check").then(response => {
     
      this.setState({newteacher: response.data})
      })
    axios.get("/days").then(response => {
       
      this.setState({days: response.data})
      });
    
    axios.get("/checkschedualt").then(response => {
      this.setState({key:response.data['key']})
      });
  } 
  componentWillMount(){
    axios.get("/checklistschedual").then(response => {
      this.setState({users:response.data})
    });
  }
  onChangefrom = fromtime => this.setState({ fromtime })
  onChangeto = totime => this.setState({ totime })
  onChangeDay(l) {
    this.setState({
      day: l
    });
  }
  onChangePrice(event, maskedvalue, floatvalue) {
    this.setState({
      price: maskedvalue
    });
  }
  back = () => {
    if(this.state.newteacher){
    this.props.onanychange()
    }
    else{
      this.props.stop()
    }
  }
  onSubmit(e) {
    e.preventDefault();
       if(!this.state.key){
        let dbCon = database.ref('schedual');
        let schedualsid = dbCon.push();
        let schedualid = schedualsid.push()
        schedualid.set({
          fromtime: this.state.fromtime,
          totime: this.state.totime,
          day: this.state.day,
          price: this.state.price, 
        });
        const obj={id: this.state.id,key: schedualsid.key};
      axios.post("/schedual", obj).then(response => {
        this.setState({
          key:''
        })
        })
      }
      else {
        let dbCon = database.ref('schedual/'+ this.state.key);
        let schedualid = dbCon.push()
        schedualid.set({
          fromtime: this.state.fromtime,
          totime: this.state.totime,
          day: this.state.day,
          price: this.state.price, 
        });
  
      }
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
                        messages: messages,
                        list:false,
                      });
                      this.state.messages.map((message) => {
                      this.setState({
                        fromtime: message.fromtime,
                        totime: message.totime,
                        day : message.day,
                        price: message.price,
                    })
                });

    }
  onChange = (i) => {
    const s={id:i.currentTarget.getAttribute('value')}
    axios.post("/checkschedual",s).then(response => {
      this.setState({key:response.data['key']})
    })
    this.setState({
        messages:[],
        list:!this.state.list,
        id:i.currentTarget.getAttribute('value'),
    });
    let app = database.ref('schedual/'+ this.state.key +'/').orderByKey().limitToLast(1);
    app.off();
setTimeout(async () => {
      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });
    
  },500);
  
  

};

  spining(){
      if( this.state.list && this.state.messages.length == 0){
        return(
          <>
      <div className="spinner-grow text-primary" role="status" style={{ margin: '200px 0 0 350px'}}>
        <span className="sr-only">Loading...</span>
      </div>
      </>
        )
      }
  }
  render() {
    let messageNodes = this.state.messages.map((message) => {
        if(this.state.id){
          const x={id:this.state.id}
          axios.post("/names",x).then(response => {
            this.setState({me:response.data[0][0]['name'],
                            other:response.data[1][0]['name']})
          })
        return (
          <div>
            <Paper style={{ display: 'flex', flexDirection: 'row', margin:'50px 35px 0px', borderRadius:'10px',textAlign:'center', height:'10%', width:'90%' }} >
              <h3 style={{margin:'5px 0px 0px 65px'}}> Schedule between </h3>
        <h3 style={{ margin:'5px 0px 0px 20px', borderBottom:'solid 1px'}}>{this.state.me}</h3>
              <h3 style={{ margin:'5px 0px 0px 30px'}}>and</h3>
        <h3 style={{ margin:'5px 0px 0px 30px', borderBottom:'solid 1px'}}>{this.state.other}</h3>
            </Paper>
          <Paper key={this.state.id} style={{ display: 'flex', flexDirection: 'column', margin:'50px 35px', borderRadius:'10px',textAlign:'center', height:'50%', width:'90%' }} >
              <h3  style={{ margin: '30px 300px -40px 40px',color:'blue' }}>From:</h3>
              <div key={this.state.id} className="shadow-box-example hoverable" style={{width: '16.1%',display:'inline-block',margin: '10px 0px 10px 300px'}}>
              <TimePicker
              onChange={this.onChangefrom}
              ref='fromtime'
              value={message.fromtime} disableClock='true' locale="sv-sv"
            /> 
            </div>
            <h3 style={{ margin: '30px 269px -40px 40px',color:'blue' }}>To:</h3> 
            <div key={this.state.id} className="shadow-box-example hoverable" style={{width: '16.1%',display:'inline-block',margin: '10px 0px 10px 300px'}}>
            <TimePicker
              onChange={this.onChangeto}
              ref='totime'
              value={message.totime} disableClock='true' locale="sv-sv"
            />
            </div>
            <h3 style={{ margin: '30px 451px -44px 112px',color:'blue'}}>Weekdays:</h3>
            <div key={this.state.id} className="shadow-box-example hoverable" style={{ width: '40%', margin: '10px 0px 10px 300px'}}>
              <Select options={this.state.days} ref='days' values={message.day} closeOnScroll = 'true' dropdownPosition="auto"  multi='true' labelField='name' valueField='id' onChange={(l) => this.onChangeDay(l)} placeholder="Select your free days" id='materialFormRegisterNameEx'/>
            </div>
            <h3 style={{ margin: '20px 396px -40px 24px',color:'blue'}}>Rate per hour:</h3>
            <div key={this.state.id} className="shadow-box-example hoverable" style={{ width: '40%', margin: '10px 0px 10px 300px'}} >
            <input style={{ width: '100%'}}  value={message.price} onChangeEvent={this.onChangePrice}/>
            </div>
            <MDBBtn
                        color="info"
                        className="mb-2"
                        onClick={this.onSubmit}
                        style={{ margin: '10px 0px 10px 300px', width:'fit-content'}}
                      >
                        send
                        <MDBIcon icon="paper-plane" className="ml-1" />
                      </MDBBtn>
        </Paper>
        </div>
        )
    
        }
        
      });
      let userslist = this.state.users.map((user) => {
        return (
          <div key={user[0]['id']}>
          <li key={user[0]['id']} style={{ margin: '10px 0 0 0'}}>
              <div key={user[0]['id']} onClick={this.onChange} value={user[0]['id']} style={{cursor:'pointer', margin:'20px 0 20px 0'}}>
              <img  src= {user[0]['source']?user[0]['source']:this.state.preview}  alt="Profile pic" style={{width:'100px', height:'100px'}} />
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
          <ul style={{listStyleType: 'none'}}>
          {userslist}
          </ul>
        </div>
        <div style={{width:'70%', height:'100%', borderLeft:'solid 1px', overflow: 'auto'}}>
          {this.spining()}
          {messageNodes}
        </div>
        </Paper>
      );
    }
   
}
