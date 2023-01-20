import React, { Component } from "react";

import Select from "react-dropdown-select";
import { database } from './firebasecon';
import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import CurrencyInput from 'react-currency-input';
import Paper from '@material-ui/core/Paper';
// import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
import TimePicker from 'react-time-picker';

export default class Schedual extends Component {
  constructor(props) {
    super(props);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id : this.props.data,
      fromtime: '6:00',
      totime: '6:00',
      days : [],
      day : [],
      price: '',
      key:"",
    };
    axios.get("/days").then(response => {
       
      this.setState({days: response.data})
      });
    const s={id:this.state.id}
    axios.post("/checkschedual",s).then(response => {
      this.setState({key:response.data['key']})
      });
  }
  componentDidMount(){
    const s={id:this.state.id}
    axios.post("/checkschedual",s).then(response => {
      this.setState({key:response.data['key']})
      let app = database.ref('schedual/'+ this.state.key +'/').orderByKey().limitToLast(1);
      app.off();
  setTimeout(async () => {
        app.on('value', snapshot => {
          this.getData(snapshot.val());
        });
      
    },500);
});
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
                      messages.map((message) => {
                      this.setState({
                        fromtime: message.fromtime,
                        totime: message.totime,
                        day : message.day,
                        price: message.price,
                    })
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
          key:response.data['key']
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
  render() {
    return (
      <Paper key={this.state.id} style={{ display: 'flex', flexDirection: 'column', margin:'0px 0px 50px 0px', borderRadius:'10px',textAlign:'center', maxHeight:'400px', width:'100%' }} >
              <h3  style={{ margin: '30px 400px -40px 40px',color:'blue' }}>From:</h3>
              <div key={this.state.id} className="shadow-box-example hoverable" style={{width: '10.3%',display:'inline-block',margin: '10px 0px 10px 450px'}}>
              {/* <TimePicker
              onChange={this.onChangefrom}
              placeholder='fromtime'
              value={this.state.fromtime} 
            />  */}
            <TimePicker
              onChange={this.onChangefrom}
              ref='fromtime'
              value={this.state.fromtime} disableClock='true' locale="sv-sv"
            /> 
            </div>
            <h3 style={{ margin: '30px 369px -40px 40px',color:'blue' }}>To:</h3> 
            <div key={this.state.id} className="shadow-box-example hoverable" style={{width: '10.3%',display:'inline-block',margin: '10px 0px 10px 450px'}}>
            {/* <TimePicker
              onChange={this.onChangeto}
              placeholder='totime' 
              value={this.state.totime}
            /> */}
             <TimePicker
              onChange={this.onChangeto}
              ref='totime'
              value={this.state.totime} disableClock='true' locale="sv-sv"
            />
            </div>
            <h3 style={{ margin: '30px 562px -44px 138px',color:'blue'}}>WeekDays:</h3>
            <div key={this.state.id} className="shadow-box-example hoverable" style={{ width: '40%', margin: '10px 0px 10px 450px'}}>
              <Select options={this.state.days} ref='days' values={this.state.day} closeOnScroll = 'true' dropdownPosition="auto"  multi='true' labelField='name' valueField='id' onChange={(l) => this.onChangeDay(l)} placeholder="Select your free days" id='materialFormRegisterNameEx'/>
            </div>
            <h3 style={{ margin: '20px 539px -40px 63px',color:'blue'}}>Price per hour:</h3>
            <div key={this.state.id} className="shadow-box-example hoverable" style={{ width: '40%', margin: '10px 0px 10px 450px'}} >
            <CurrencyInput prefix="$" selectAllOnFocus='true' decimalSeparator="," style={{ width: '100%'}} thousandSeparator="." value={this.state.price} onChangeEvent={this.onChangePrice}/>
            </div>
            <MDBBtn
                        color="info"
                        className="mb-2"
                        onClick={this.onSubmit}
                        style={{ margin: '10px 0px 10px 450px', width:'fit-content'}}
                      >
                        send
                        <MDBIcon icon="paper-plane" className="ml-1" />
                      </MDBBtn>
        </Paper>
      );
    }
}
