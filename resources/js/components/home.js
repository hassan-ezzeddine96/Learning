import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer,  MDBBtn, MDBIcon,  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBAnimation, MDBCol, MDBRow, MDBFooter} from "mdbreact";
import Teachersearch from "./teachersearch";
import 'react-widgets/dist/css/react-widgets.css';
import Newteacher from './newteacher';
import Profile from './profile';
import Teacherinfo from './teacherinfo';
import Favorites from './favorites';
import firebase from "firebase";
import 'firebase/firestore';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Rating from './rating';
import HomeStudent from './homestudent';
import HomeTeacher from './hometeacher';
import StudentInfo from './studentinfo';
import Pagination from './pagination';
import RegisterTeacher from './registerTeacher';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Update from './update';
import TeacherSchedual from './teacherschedual';
import TeacherChat from './teacherchat';
import MainChat from './chatting/MainChat';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AddCourse from './addCourse';
import Courses from './courses';



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.setRedirectteacher = this.setRedirectteacher.bind(this);
        this.setRedirectcourses = this.setRedirectcourses.bind(this);
        this.setRedirectprofile = this.setRedirectprofile.bind(this);
        this.setRedirectfavorites = this.setRedirectfavorites.bind(this);
        this.onChange = this.onChange.bind(this);
        this.back = this.back.bind(this);
        this.filterUser = this.filterUser.bind(this);
        this.filterUserx = this.filterUserx.bind(this);
        this.update = this.update.bind(this);
        this.addcourse = this.addcourse.bind(this);
        this.chat = this.chat.bind(this);
        this.go = this.go.bind(this);
        this.schedule = this.schedule.bind(this);
        this.onChangeteacher = this.onChangeteacher.bind(this);
        this.onChangeteachercourse = this.onChangeteachercourse.bind(this);
        this.onChangefavorites = this.onChangefavorites.bind(this);
        this.setRedirectnewteacher = this.setRedirectnewteacher.bind(this);
        this.setHome = this.setHome.bind(this);
        this.setRedirectstudentinfo = this.setRedirectstudentinfo.bind(this);
        this.state = {
        redirectteachers: false,
        redirectteacher: false,
        newteacher: false,
        redirectprofile: false,
        redirectteacherinfo: false,
        redirectfavorites: false,
        redirectstudentinfo: false,
        data : [],
        go:0,
        update:false,
        chat:false,
        schedule:false,
        teacherid: [],
        flag: false,
        flag2: false,
        back:false,
        modal:true,
        add:false,
        flag1:0,
         };
      }
     
      // printDocument() {
      //   const input = document.getElementById('divToPrint');
      //   input.style.width = "210mm";
      //   html2canvas(input)
      //     .then((canvas) => {
      //       const imgData = canvas.toDataURL('image/png');
      //       const pdf = new jsPDF();
      //       pdf.addImage(imgData, 'JPEG', 0, 0);
      //       // pdf.output('dataurlnewwindow');
      //       pdf.save("homescreenshot.pdf");
      //     })
      //   ;
      //   input.style.width = "100%";
      // }
    componentDidMount(){
        let token = document
        .getElementsByName("csrf-token")[0]
        .getAttribute("content");
         axios.get("/check").then(response => {
     
                this.setState({newteacher: response.data})
                //  console.log(this.state.newteacher);
                })
    }
    filterUser(filterValue,f){
      this.setState({
        data: [],
        flag1:0,
        redirectteachers : false,
        redirectteacher : false,
        redirectcourses:false,
        redirectteacherinfo: false,
      });
      this.setState({
        data: filterValue,
        flag1:f,
        redirectteachers : true,
        redirectteacher : true,
      });
    }
    filterUserx(filterValue){
      this.setState({
        data: [],
        redirectteachers : false,
        redirectteacher : false,
        redirectcourses:false,
        redirectteacherinfo: false,
        redirectprofile:false,
        redirectfavorites:false,
        redirectstudentinfo:false,

      });
      this.setState({
        data: filterValue,
        flag1:1,
        redirectteachers : true,
      });
    }
    update(){
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile:false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:true,
        add:false,
        chat:false,
        schedule:false,
        go:0,
      });
    }
    addcourse(){
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile:false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        add:true,
        chat:false,
        schedule:false,
        go:0,
      });
    }
    chat(){
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile:false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        chat:true,
        schedule:false,
        go:0,
        add:false,
      });
    }
    schedule(){
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile:false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        chat:false,
        schedule:true,
        go:0,
        add:false,
      });
    }

    onChange = () => {
      this.setState({
          newteacher : true,
          redirectteacherinfo: false,
          modal: !this.state.modal,
      });
  };
  onChangeteacher(id){
    this.setState({
      teacherid: id,
      flag: true,
      flag2: false,
      redirectteacherinfo : !this.state.redirectteacherinfo,
      redirectteachers : false
    });
};
onChangeteachercourse(id){
  this.setState({
    teacherid: id,
    flag2: true,
    flag: true,
    redirectteacherinfo : !this.state.redirectteacherinfo,
    redirectteachers : false
  });
};
onChangefavorites(id){
  this.setState({
    teacherid: id,
    flag: false,
    flag2: false,
    redirectteacherinfo : !this.state.redirectteacherinfo,
    redirectfavorites : !this.state.redirectfavorites
  });
};
back(){
  this.setState({
    back:true,
  })
}
close = () =>{
  this.setState({go:0})
}
onChan = () => {
  if(!this.state.back){
    if(this.state.flag){
      if(this.state.flag2){
        this.setState({
          redirectteacherinfo : !this.state.redirectteacherinfo,
        });
      }
      else{
      this.setState({
        redirectteacherinfo : !this.state.redirectteacherinfo,
        redirectteachers : !this.state.redirectteachers
      });
      }
    }
    else{
      this.setState({
        redirectteacherinfo : !this.state.redirectteacherinfo,
        redirectfavorites : !this.state.redirectfavorites
      });
    }
  }
  else{
    this.setState({
      redirectteacher: false,
      redirectprofile:false,
      redirectteacherinfo: false,
      redirectteachers:false,
      redirectfavorites:false,
      redirectstudentinfo:false,
      back:false,
      redirectcourses:false,
    })
  }
 
};
    setRedirectteacher() {
        this.setState({
          redirectteacher: !this.state.redirectteacher,
          redirectprofile: false,
          redirectteacherinfo: false,
          redirectteachers:true,
          redirectfavorites:false,
          redirectstudentinfo:false,
          redirectcourses:false,
          modal:true,
          update:false,
          chat:false,
          schedule:false,
          go:0,
          add:false,
        });
    }
    setRedirectcourses() {
      this.setState({
        redirectcourses: !this.state.redirectcourses,
        redirectteacher: false,
        redirectprofile: false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        chat:false,
        schedule:false,
        go:0,
        add:false,
      });
  }
    go(e) {
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile: false,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        chat:false,
        schedule:false,
        go:e,
        add:false,
      });
  }
    setRedirectprofile() {
      this.setState({
        redirectteacher: false,
        redirectcourses:false,
        redirectprofile:!this.state.redirectprofile,
        redirectteacherinfo: false,
        redirectteachers:false,
        redirectfavorites:false,
        redirectstudentinfo:false,
        modal:true,
        update:false,
        chat:false,
        schedule:false,
        go:0,
        add:false,
      });
  }
  setRedirectstudentinfo() {
    this.setState({
      redirectteacher: false,
      redirectcourses:false,
      redirectprofile:false,
      redirectteacherinfo: false,
      redirectteachers:false,
      redirectfavorites:false,
      redirectstudentinfo:!this.state.redirectstudentinfo,
      modal:true,
      update:false,
      chat:false,
      schedule:false,
      go:0,
      add:false,
    });
}
  setRedirectfavorites() {
    this.setState({
      redirectteacher: false,
      redirectcourses:false,
      redirectprofile:false,
      redirectteacherinfo: false,
      redirectteachers:false,
      redirectstudentinfo:false,
      redirectfavorites:!this.state.redirectfavorites,
      modal:true,
      update:false,
      chat:false,
      schedule:false,
      go:0,
      add:false,
    });
}
setRedirectnewteacher() {
  this.setState({
    redirectteacher: false,
    redirectcourses:false,
    redirectprofile:false,
    redirectteacherinfo: false,
    redirectteachers:false,
    redirectfavorites:false,
    redirectstudentinfo:false,
    modal: !this.state.modal,
    update:false,
    chat:false,
    schedule:false,
    go:0,
    add:false,
  });
}
setHome() {
  this.setState({
    redirectteacher: false,
    redirectcourses:false,
      redirectprofile:false,
      redirectteacherinfo: false,
      redirectteachers:false,
      redirectfavorites:false,
      redirectstudentinfo:false,
      modal:true,
      update:false,
      chat:false,
      schedule:false,
      go:0,
      add:false,
  });
}

    renderRedirectteacher  (){
        if (this.state.redirectteacher) {
          return <Teachersearch
          filterUser={this.filterUser}
          />
        }
    }
    renderRedirectnewteacher  (){
      if (!this.state.modal) {
        return <Newteacher onAnyChange={this.onChange}
        />
    }
    }
    renderRedirectprofile  (){
      if (this.state.redirectprofile) {
        return <Profile filterUser={this.filterUserx} update={this.update} chat={this.chat} schedule={this.schedule} add={this.addcourse} />
      }
    }
    renderRedirectlist  (){
      if (this.state.redirectteachers) {
        return <Pagination dataFromParent = {this.state.data} newdata={this.state.flag1} onAnyChange={this.onChangeteacher}/>
      }
    }
    renderRedirectcourses  (){
      if (this.state.redirectcourses) {
        return <Courses dataFromParent = {this.state.data} onAnyChange={this.onChangeteachercourse}/>
      }
    }
    renderRedirectteacherinfo  (){
      if (this.state.redirectteacherinfo) {
        return <Teacherinfo filterUser={this.filterUserx} dataFromParent = {this.state.teacherid} onAnyChange={this.onChan}/>
      }
    }
    renderRedirectfavorites  (){
      if (this.state.redirectfavorites) {
        return <Favorites onAnyChange={this.onChangefavorites}/>
      }
    }
    renderRedirectstudentpic  (){
      if (this.state.redirectstudentinfo) {
        return <StudentInfo onAnyChange={this.setHome}/>
      }
    }
    renderRedirectupdate  (){
      if (this.state.update) {
        return <Update onanychange={this.setRedirectprofile} />
      }
    }
    renderRedirectadd  (){
      if (this.state.add) {
        return <AddCourse onanychange={this.setRedirectprofile} />
      }
    }
    renderRedirectchat  (){
      if (this.state.chat) {
        return <TeacherChat onanychange={this.setRedirectprofile} stop={this.setHome} />
      }
    }
    renderchat  (){
      if (this.state.go != 0) {
        return(<div>
          <MDBBtn onClick={this.close}>x</MDBBtn>
          <MainChat data = {this.state.go}/>
          </div>
        )
      }
    }
    renderRedirectschedule  (){
      if (this.state.schedule) {
        return <TeacherSchedual onanychange={this.setRedirectprofile} stop={this.setHome} />
      }
    }
    choose(){
      if (!this.state.newteacher) {
        return(
          <NavItem onClick={this.setRedirectnewteacher}>
          <NavIcon>
          <div className='homeicon'>
              <MDBIcon icon="plus" style={{cursor: 'pointer'}} />
          </div>
          </NavIcon>
          <NavText>
            New Teacher
          </NavText>
          </NavItem>
        )
      }
      else{
        return(
          <NavItem   onClick={this.setRedirectprofile}>
          <NavIcon>
          <div className='homeicon'>
              <MDBIcon icon="user" style={{cursor: 'pointer'}}/>
          </div>    
          </NavIcon>
          <NavText>
              My Profile
          </NavText>
         </NavItem>
        )

      }
    }
    studentinfo(){
      if (!this.state.newteacher) {
        return(
          <NavItem  onClick={this.setRedirectstudentinfo}>
          <NavIcon>
          <div className='homeicon'>
          <MDBIcon icon="sitemap" style={{cursor: 'pointer'}} />
          </div>
          </NavIcon>
          <NavText>
            My Extra info
          </NavText>
          </NavItem>
        )
      }
    }
    chatlist(){
      if (!this.state.newteacher) {
        return(
          <NavItem  onClick={this.chat}>
          <NavIcon>
          <div className='homeicon'>
          <MDBIcon far icon="comments" style={{cursor: 'pointer'}} />
          </div>
          </NavIcon>
          <NavText>
            Chatting
          </NavText>
          </NavItem>
        )
      }
    }
    schedulelist(){
      if (!this.state.newteacher) {
        return(
          <NavItem  onClick={this.schedule}>
          <NavIcon>
          <div className='homeicon'>
          <MDBIcon far icon="calendar-check" style={{cursor: 'pointer'}}/>
          </div>
          </NavIcon>
          <NavText>
            Schedules
          </NavText>
          </NavItem>
        )
      }
    }
  
        hello(){
          if(!this.state.redirectteacher &&
            !this.state.redirectcourses &&
            !this.state.redirectprofile &&
            !this.state.redirectteacherinfo &&
            !this.state.redirectteachers &&
            !this.state.redirectfavorites &&
            !this.state.redirectstudentinfo &&
            this.state.modal&&
            !this.state.update&&
            !this.state.chat&&
            !this.state.schedule&&
            !this.state.add ){
              return(
                <div>
                <MDBCarousel
                  activeItem={1}
                  length={3}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                  style={{margin:'0 0 50px 0'}}
                >
                  <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="/images/welcome/Webp.net-resizeimage (5).jpg"
                          alt="First slide"
                          height= '200px'
                        />
                        <MDBMask overlay="black-slight" />
                      </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="/images/welcome/getty_769729163_200013341653767170567_404088.jpg"
                          alt="Second slide"
                          height= '200px'
                        />
                        <MDBMask overlay="black-slight" />
                      </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                      <MDBView>
                        <img
                          className="d-block w-100"
                          src="/images/welcome/Webp.net-resizeimage (8).jpg"
                          alt="Third slide"
                          height= '200px'
                        />
                        <MDBMask overlay="black-slight" />
                      </MDBView>
                    </MDBCarouselItem>
                  </MDBCarouselInner>
                </MDBCarousel>
                <div >
                  <Grid container spacing={32}>
                    <Grid item xs={12}>
                      <div>
                       <HomeStudent profiles={this.setRedirectstudentinfo} searchs={this.setRedirectteacher} go={this.go} courses={this.setRedirectcourses}/>
                       {this.renderchat()}
                      </div>
                    </Grid>
                    <Grid item xs={12} >
                      <div>
                        <HomeTeacher profiles={this.setRedirectnewteacher}/>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating onAnyChange={this.onChangeteacher} back={this.back}/>
                    </Grid>
                    <Grid item xs={12}>
                      <div className='quote'>
                          <h1 style={{margin: '40px 0px 10px'}}>"</h1>
                          <h3>Everybody is a genius. But if you judge a fish by its ability to climb a tree,</h3>
                          <h3> it will live its whole life believing that it is stupid.</h3>
                          <h5 style={{margin: '20px 0px 0px 0px', color:'red'}}>ALBERT EINSTEIN</h5>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <MDBFooter color="blue" className="font-small pt-4 mt-4" style={{width: '1779px', boxShadow: '5px 5px 40px rgb(31, 78, 167)', margin: '5000px 0 -30px -320px', position: 'relative' }}>
                  <MDBContainer fluid className="text-center text-md-left" >
                    <MDBRow>
                    <MDBCol md="2">
                      <div className="footer_bg_three"></div>
                      </MDBCol>
                      <MDBCol md="4">
                        <h1 className="title" style={{margin: '40px 0 0 200px'}}>Tutor Me</h1>
                        <div className="spin">
                            
                            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{margin: '0 0 0 240px'}}>
                                <circle cx="170" cy="170" r="160" stroke="#f44336"/>
                                <circle cx="170" cy="170" r="135" stroke="#3f51b5"/>
                                <circle cx="170" cy="170" r="110" stroke="#f44336"/>
                                <circle cx="170" cy="170" r="85" stroke="#3f51b5"/>
                            </svg>
                            
                        </div>
                      </MDBCol>
                      <MDBCol md="5" style={{margin:'0px -1px 0px 140px'}}>
                      <h3 className="text-uppercase font-weight-bold">Contact</h3>
                      <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '170px'}}/>
                      <h4>
                        <i className="fas fa-home mr-3"></i> Beirut, Lebanon</h4>
                      <h4>
                        <i className="fas fa-envelope mr-3"></i> wissam_ezz@hotmail.com</h4>
                      <h4>
                        <i className="fas fa-phone mr-3"></i> +961 03343102</h4>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                  <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                      &copy; {new Date().getFullYear()} Copyright:  wissam_ezz
                    </MDBContainer>
                  </div>
                </MDBFooter>
              </div>
              )
            }
        }
    render() {
        return (
        <MDBContainer id="divToPrint" >
          <SideNav style={{ background: 'rgb(56, 71, 201)', position:'fixed'}}>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem  onClick={this.setHome}>
            <NavIcon >
              <div className='homeicon'>
            <MDBAnimation type="bounce" >
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', cursor: 'pointer' }} />
            </MDBAnimation>
            </div>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        {this.studentinfo()}
        <NavItem  onClick={this.setRedirectteacher}>
            <NavIcon>
            <div className='homeicon'>
                <MDBIcon icon="search" style={{cursor: 'pointer'}}/>
            </div>    
            </NavIcon>
            <NavText>
                Search
            </NavText>
        </NavItem>
        <NavItem  onClick={this.setRedirectcourses}>
            <NavIcon>
            <div className='homeicon'>
                <MDBIcon icon="book-open" style={{cursor: 'pointer'}}/>
            </div>    
            </NavIcon>
            <NavText>
                Courses
            </NavText>
        </NavItem>
        {this.choose()}
        <NavItem onClick={this.setRedirectfavorites}>
            <NavIcon>
            <div className='homeicon'>
                <MDBIcon far icon="heart" style={{cursor: 'pointer'}}/>
            </div>
            </NavIcon>
            <NavText>
                My Favorites
            </NavText>
        </NavItem>
        {this.chatlist()}
        {this.schedulelist()}
    </SideNav.Nav>
</SideNav>

          {this.hello()}
          {this.renderRedirectteacher()}
          {this.renderRedirectprofile()}
          {this.renderRedirectfavorites()}
          {this.renderRedirectlist()}
          {this.renderRedirectcourses()}
          {this.renderRedirectteacherinfo()}
          {this.renderRedirectnewteacher()}
          {this.renderRedirectstudentpic()}
          {this.renderRedirectupdate()}
          {this.renderRedirectadd()}
          {this.renderRedirectchat()}
          {this.renderRedirectschedule()}
          
        </MDBContainer>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
// style={{ width: '210mm'}}
{/* <button onClick={this.printDocument}>Print</button> */}