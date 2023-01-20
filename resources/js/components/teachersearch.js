import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';
import Select from "react-dropdown-select";
import Pagination from './pagination';



export default class Teachersearch extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChangeLanguage = this.onChangeLanguage.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeCourse = this.onChangeCourse.bind(this)
        this.onChangeUni = this.onChangeUni.bind(this)
        this.onChangeProject = this.onChangeProject.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.state = {
            language : [],
            lang : [],
            years : [],
            year : [],
            courses : [],
            course : [],
            university : [],
            uni : [],
            projects : [],
            proj : [],
            search:[],
          }
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
      onChangeCourse(l) {
        this.setState({
          course: l
        });
      }
      onChangeUni(l) {
        this.setState({
          uni: l
        });
      }
      onChangeProject(l) {
        this.setState({
          proj: l
        });
      }
      onFormSubmit(e){
        e.preventDefault();
        this.setState({
          search: [],
        });
        this.fileUpload();
      }
      fileUpload(){ 
        const obj = {
          lang: this.state.lang,
          course: this.state.course,
          year: this.state.year,
          uni: this.state.uni,
          project: this.state.proj,
        };
        return axios.post('/searchresult', obj)
                .then(response => {
                    this.setState({
                        search: response.data,
                      });
                      this.props.filterUser(this.state.search,1);
                });
      }
      
      componentDidMount(){
        axios.get("/suniversity").then(response => {
       
            this.setState({university: response.data})
            // console.log(this.state);
            })
        axios.get("/slanguage").then(response => {
       
            this.setState({language: response.data})
            // console.log(this.state);
            })
        axios.get("/sprojects").then(response => {
 
            this.setState({projects: response.data})
            // console.log(this.state);
            })
        axios.get("/scourses").then(response => {
     
            this.setState({courses: response.data})
            // console.log(this.state);
            })
        axios.get("/syears").then(response => {
         
            this.setState({years: response.data})
            // console.log(this.state.years);
            })
    }
    render() {
        return (
                <div>
                    <h2 style={{margin:'10px 400px 30px 400px'}} >Look for tutors</h2>
                    <form onSubmit={this.onFormSubmit} >
                        <MDBContainer style={{ backgroundColor: 'white'}} >
                            <div className="shadow-box-example hoverable" style={{width:'165px',display:'inline-flex', borderRadius:'20px'}}>
                            <Select options={this.state.language} style={{width:'165px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeLanguage(l)} placeholder="your language" />
                            </div>
                            <div className="shadow-box-example hoverable" style={{width:'165px',display:'inline-flex', borderRadius:'20px'}}>
                            <Select options={this.state.years} style={{width:'165px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeYear(l)} placeholder="your class" />
                            </div>
                            <div className="shadow-box-example hoverable" style={{width:'165px',display:'inline-flex', borderRadius:'20px'}}>
                            <Select options={this.state.courses} style={{width:'165px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' multi='true' labelField='name' valueField='id' onChange={(l) => this.onChangeCourse(l)} placeholder="select courses" />
                            </div>
                            <div className="shadow-box-example hoverable" style={{width:'270px',display:'inline-flex', borderRadius:'20px'}}>
                            <Select options={this.state.university} style={{width:'270px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeUni(l)} placeholder="select your university" />
                            </div>
                            <div className="shadow-box-example hoverable" style={{width:'165px',display:'inline-flex', borderRadius:'20px'}}>
                            <Select options={this.state.projects} style={{width:'165px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true'  labelField='name' valueField='id' onChange={(l) => this.onChangeProject(l)} placeholder="your project" />
                            </div>
                            <MDBBtn color="primary" size='md' type="submit" style={{borderRadius:'20px'}} > Search  <MDBIcon fab icon="searchengin" /> </MDBBtn>
                        </MDBContainer>
                    </form >
                </div>
        );
    }
}
