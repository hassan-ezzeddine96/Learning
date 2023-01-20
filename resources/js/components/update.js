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

export default class Update extends Component {
    constructor(props) {
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirst = this.onChangeFirst.bind(this);
        this.onChangeLast = this.onChangeLast.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
        university : [],
        uni : [],
        courses : [],
        course : [],
        years : [],
        year : [],
        projects : [],
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
        steps:['Profile Picture', 'Profile Information', 'Teaching Experience'],
         };
      }
      handleNext () {
        this.setState({activeStep: this.state.activeStep +1})
      };

      handleBack () {
        this.setState({activeStep: this.state.activeStep -1})
      };
      
      
      toggle  () {
        this.setState({
          modal: !this.state.modal
        });
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
      onChangeInfo(e) {
        this.setState({
          info: e.target.value
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
          };
          axios.post('/teacherupdate', obj)
              .then(res =>{
                this.renderH();
              });
      }
      renderH(){
          this.props.onanychange()
        
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
          axios.get("/projects").then(response => {
       
                  this.setState({projects: response.data})
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
            axios.get("/universityup").then(response => {
                    this.setState({uni: JSON.parse(response.data[0]['university'])})
                    // console.log(this.state);
                    })
            axios.get("/projectsup").then(response => {
         
                    this.setState({project: JSON.parse(response.data[0]['projects'])})
                    // console.log(this.state);
                    })
            axios.get("/coursesup").then(response => {
             
                    this.setState({course: JSON.parse(response.data[0]['courses'])})
                    // console.log(this.state);
                    })
            axios.get("/yearsup").then(response => {
                 
                    this.setState({year: JSON.parse(response.data[0]['years'])})
                    
                    })
            axios.get("/languageup").then(response => {
              
                    this.setState({lang: JSON.parse(response.data[0]['language'])});
                      // console.log(this.state.lang);
                    
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
          axios.get("/profil").then(response => {
              if(response.data != "nothing"){      
                   this.setState({preview: response.data[0]['source']})
              }
                   })
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
                Teaching Levels:
                <Multiselect
                data={this.state.years}
                valueField='id'
                textField='name'
                year={this.state.year}
                onChange={year => this.setState({ year })}
                defaultValue={this.state.year}
                />
                Courses:
                <Multiselect
                data={this.state.courses}
                valueField='id'
                textField='name'
                course={this.state.course}
                onChange={course => this.setState({ course })}
                defaultValue={this.state.course}
                />
                Languages:
                <Multiselect
                data={this.state.language}
                valueField='id'
                textField='name'
                lang={this.state.lang}
                onChange={lang => this.setState({ lang })}
                defaultValue={this.state.lang}
                />
                University:
                <Multiselect
                data={this.state.university}
                valueField='id'
                textField='name'
                uni={this.state.uni}
                onChange={uni => this.setState({ uni })}
                defaultValue={this.state.uni}
                />
                Projects:
                <Multiselect
                data={this.state.projects}
                valueField='id'
                textField='name'
                project={this.state.project}
                onChange={project => this.setState({ project })}
                defaultValue={this.state.project}
                />
                <MDBInput
                  label="Additional Information"
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
// Location:
//                 <MDBInput id="autocomplete" placeholder=""  value={this.state.query}
//                 style={{
//                     margin: '0 auto',
//                     maxWidth: 800,
//                 }}
//                 />
//                 <Script
//                 url="https://maps.googleapis.com/maps/api/js?key=your_api_key&libraries=places"
//                 onLoad={this.handleScriptLoad}
//                 />
// handleScriptLoad ()  {
//     // Declare Options For Autocomplete
//     const options = {
//       types: ['(cities)'],
//     };

//     // Initialize Google Autocomplete
//     /*global google*/ // To disable any eslint 'google not defined' errors
//     this.autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById('autocomplete'),
//       options,
//     );

//     // Avoid paying for data that you don't need by restricting the set of
//     // place fields that are returned to just the address components and formatted
//     // address.
//     this.autocomplete.setFields(['address_components', 'formatted_address']);

//     // Fire Event when a suggested name is selected
//     this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
//   }
  
//   handlePlaceSelect  ()  {

//     // Extract City From Address Object
//     const addressObject = this.autocomplete.getPlace();
//     const address = addressObject.address_components;

//     // Check if address is valid
//     if (address) {
//       // Set State
//       this.setState(
//         {
//           city: address[0].long_name,
//           query: addressObject.formatted_address,
//         }
//       );
//     }
//   }
//   this.handleScriptLoad = this.handleScriptLoad.bind(this);
//         this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

// city: '',
//         query: '',