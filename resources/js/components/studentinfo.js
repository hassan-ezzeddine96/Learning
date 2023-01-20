import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets'
import Script from 'react-load-script';
import axios from 'axios';
import Profilepic from './inputfile';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from "react-dropdown-select";



export default class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this)
    this.onChangeYear = this.onChangeYear.bind(this)
    this.onChangeUni = this.onChangeUni.bind(this)
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.uniselect = this.uniselect.bind(this);
    this.state = {
    university : [],
    uni : [],
    course : [],
    years : [],
    year : [],
    project : [],
    language : [],
    lang : [],
    city: '',
    query: '',
    first: '',
    last: '',
    phone: '',
    age: '',
    info: '',
    preview: '/images/XXfdOcsLvZ.png',
    activeStep : 0,
    steps:['Profile Picture', 'Profile Information', 'Education Level'],
     };
  }
  handleNext () {
    this.setState({activeStep: this.state.activeStep +1})
  };

  handleBack () {
    this.setState({activeStep: this.state.activeStep -1})
  };

  handleReset () {
    this.setState({activeStep: 0})
  };
  
  
  onChangeFirst(e) {
    this.setState({
      first: e.target.value
    });
  }
  onChangeLast(e) {
    this.setState({
      last: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }
  onChangeLanguage(l) {
    this.setState({
      lang: l
    });
  }
  onChangeYear(l) {
    this.setState({
      year: l
    });
  }
  onChangeUni(l) {
    this.setState({
      uni: l
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
        first: this.state.first,
        last: this.state.last,
        phone: this.state.phone,
        age: this.state.age, 
        info: this.state.info,
        uni: this.state.uni,
        project: this.state.project,
        lang: this.state.lang,
        course: this.state.course,
        year: this.state.year,
        teacher: 'false',
        rate: 0,
      };
      axios.post('/teacher', obj)
          .then(res =>{
            this.renderH();
          });
  }
  renderH(){
    this.props.onAnyChange();
  }
    componentDidMount(){
       axios.get("/university").then(response => {
   
              this.setState({university: response.data})
              // console.log(this.state);
              })
      axios.get("/languages").then(response => {
   
              this.setState({language: response.data})
              // console.log(this.state);
              })
      axios.get("/years").then(response => {
           
              this.setState({years: response.data})
              // console.log(this.state.years);
              })
      axios.get("/profil").then(response => {
          if(response.data != "nothing"){      
               this.setState({preview: response.data[0]['source']})
          }
               })
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
            
  }
  uniselect(){
    if(this.state.year.length!=0)
    {
      
      if(this.state.year[0]['id']>12){
      return(
        <Select options={this.state.university} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeUni(l)} placeholder="select your university" />
      );
      }
    }

  }
  renderContent (step){
    if(step == 0){
      return <Profilepic/>
    }
    if(step == 1){
      return(
        <MDBContainer>
            <MDBInput label="First name" value={this.state.first} onChange={this.onChangeFirst} required/>
            <MDBInput label="Last name" value={this.state.last} onChange={this.onChangeLast} required/>
            <MDBInput label="Phone number" value={this.state.phone} onChange={this.onChangePhone} required/>
            <MDBInput label="Age" value={this.state.age} onChange={this.onChangeAge} required/>
        </MDBContainer>
      );
    }
    if(step == 2){
      return(
        <MDBContainer>
            <Select options={this.state.language} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}}closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeLanguage(l)} placeholder="Select your language" />
            <Select options={this.state.years} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeYear(l)} placeholder="Select your class" />
            {this.uniselect()}
        </MDBContainer>
      );
    }
    
}
render() {
    return (
          <div >
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <div >
                    {this.renderContent(index)}
                      <div>
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          style={{borderRadius:'20px'}}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          style={{borderRadius:'20px'}}
                        >
                          {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {this.state.activeStep === this.state.steps.length && (
              <Paper square elevation={0} >
                <Typography>All steps completed </Typography>
                <Button onClick={this.handleReset} style={{borderRadius:'20px'}}>
                  Reset all
                </Button>
                Or
                <MDBBtn
                color="info"
                className="mb-2"
                onClick={this.onSubmit}
                style={{borderRadius:'20px'}}
                >
                send
                <MDBIcon icon="paper-plane" className="ml-1" />
              </MDBBtn>
              </Paper>
            )}
          </div>
    );
}
}
