import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets'
import Script from 'react-load-script';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Select from "react-dropdown-select";

export default class AddCourse extends Component {
    constructor(props) {
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onUploadfile = this.onUploadfile.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeSubject = this.onChangeSubject.bind(this)
        this.state = {
        courses : [],
        course : [],
        years : [],
        year : [],
        language : [],
        lang : [],
        newname:'',
        coursename:'',
        info: '',
        activeStep : 0,
        steps:['Upload Course', 'Basic Information', 'Additional Information'],
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
      onChangeSubject(l) {
        this.setState({
          course: l
        });
      }
      onChangeInfo(e) {
        this.setState({
          info: e.target.value
        });
      }
      onChangeName(e) {
        this.setState({
          coursename: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const obj = {
            info: this.state.info,
            coursename:this.state.coursename,
            name:this.state.newname,
            lang: this.state.lang,
            course: this.state.course,
            year: this.state.year,
          };
          console.log(this.state.lang[0]['id'])
          axios.post('/teachercourse', obj)
              .then(res =>{
                this.renderH();
              });
      }
      renderH(){
          this.props.onanychange()
        
      }
      onUploadfile(event) {
          let n= event.target.files[0]['name']
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0])
          reader.onload=(e)=>{
            const formData = {file: e.target.result,name:n }
            return axios.post('/courseupload', formData)
                    .then(response => {
                        this.setState({
                            newname:response.data
                          });
                    });
          }
      }
      
      
        componentDidMount(){
          axios.get("/languages").then(response => {
       
                  this.setState({language: response.data})
                  // console.log(this.state);
                  })
          axios.get("/courses").then(response => {
           
                  this.setState({courses: response.data})
                  // console.log(this.state);
                  })
          axios.get("/years").then(response => {
               
                  this.setState({years: response.data})
                  // console.log(this.state.years);
                  })
      }
      renderContent (step){
        if(step == 0){
          return (
                    <div className="custom-file" style={{width: '250px', margin: '10px 0 0 0'}}>
                        <MDBInput
                        type="file"
                        className="custom-file-input"
                        style={{width: '250px'}}
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={this.onUploadfile}
                        />
                        <label className="custom-file-label" style={{width: '250px', cursor: 'pointer'}} htmlFor="inputGroupFile01">
                        Choose Course
                        </label>
                    </div>
          );
        }
        if(step == 1){
          return(
            <MDBContainer>
            <Select options={this.state.language} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeLanguage(l)} placeholder="Language   " />
            <Select options={this.state.courses} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeSubject(l)} placeholder="Subject   " />
            <Select options={this.state.years} style={{ borderColor:'#1aafff', borderRadius:'20px', margin:'10px 0'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeYear(l)} placeholder="Class   " />
        </MDBContainer>
          );
        }
        if(step == 2){
          return(
            <MDBContainer>
                 <MDBInput
                        label="Course name"
                        type="text"
                        iconClass="dark-grey"
                        value={this.state.coursename}
                        onChange={this.onChangeName}
                        />
                <MDBInput
                  label="Brief description"
                  type="textarea"
                  rows="2"
                  icon="pencil-alt"
                  iconClass="dark-grey"
                  value={this.state.info}
                  onChange={this.onChangeInfo}
                />
            </MDBContainer>
          );
        }
        
    }
    render() {
        return (
              <div >
                   <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === this.state.steps.length ? (
                    <div>
                        <Typography >All steps completed</Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                        <MDBBtn
                    color="info"
                    className="mb-2"
                    onClick={this.onSubmit}
                    style={{borderRadius:'20px'}}
                    >
                    send
                    <MDBIcon icon="paper-plane" className="ml-1" />
                  </MDBBtn>
                    </div>
                    ) : (
                    <div>
                        <Typography >{this.renderContent(this.state.activeStep)}</Typography>
                        <div>
                        <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            style={{borderRadius:'20px'}}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleNext} style={{borderRadius:'20px'}}>
                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                    )}
                </div>
              </div>
        );
    }
}