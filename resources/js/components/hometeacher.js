import React, { Component }  from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MDBIcon, MDBBtn, MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
export class HomeTeacher extends Component {
  constructor(props) {
    super(props);
    this.profile = this.profile.bind(this);
    this.state = {
      teacher: true,
      nbstudent: 0,
      nbteacher: 0,
    }
    axios.get("/check").then(response => {
     
      this.setState({teacher: response.data})
      })
      axios.get("/getnumberstudents").then(response => {
     
        this.setState({nbstudent: response.data})
        })
        axios.get("/getnumberteachers").then(response => {
     
          this.setState({nbteacher: response.data})
          })
  }
  profile(){
    if(!this.state.teacher){
    this.props.profiles();
    }
    else{
      alert('you allready inserted your info!');
    }
  }
  render(){
  return (
    <div>
       <Paper style={{ margin:'70px 6px 110px 5px', display: 'flex', flexDirection: 'row', borderRadius:'10px' }} >
        <div className='nbstudent'>
        <div style={{ display: 'inline-flex', flexDirection: 'row', textAlign: 'center', margin:'50px 0 0 0 '}}>
  <h1 style={{borderRight:'solid 0.5px', paddingRight:'20px', margin:'10px 15px',color:'blue'}}>{this.state.nbstudent}</h1>
          <div style={{ display: 'inline-flex', flexDirection: 'column'}}>
            <h4>Students</h4>
            <h4>Online</h4>
          </div>
        </div>
        </div>
        <div className='nbteacher'>
        <div style={{ display: 'inline-flex', flexDirection: 'row', textAlign: 'center', margin:'50px 0 0 0 '}}>
  <h1 style={{borderRight:'solid 0.5px', paddingRight:'20px', margin:'10px 15px',color:'blue'}}>{this.state.nbteacher}</h1>
          <div style={{ display: 'inline-flex', flexDirection: 'column'}}>
            <h4>Amazing</h4>
            <h4>Tutors</h4>
          </div>
        </div>
        </div>
    </Paper>
    <div style={{textAlign:'center', margin:'20px 0 110px 0'}}>
      <h2 style={{ display:'block'}}>What greater joy there is</h2>
      <h6 style={{ display:'block'}}>than to witness a student’s success!</h6>
    </div>
      <Paper style={{ margin:'70px 6px 70px 5px', display: 'flex', flexDirection: 'row', borderRadius:'10px' }} >
        <div className='teacherleft'>
        <MDBView hover>
              <img
                className="myimage"
                src="/images/welcome/teacher_PNG80.png"
                alt="Second slide"
                height= '260px'
                style={{ margin: '40px 0 0 200px'}}
              />
              <MDBMask className="flex-center" overlay="blue-light">
                <h3 className="white-text">Welcome Tutors</h3>
              </MDBMask>
        </MDBView>
        </div>
        <div className='teacherright'>
        <h4 style={{margin:'20px 0 5px 0', color:'burlywood'}}>Be part of our</h4>
        <h2>wonderful team</h2>
        <hr style={{width:'30%', color:'burlywood', border: 'solid 1px'}}/>
        <div style={{textAlign:'center', margin:'10px 0 0 50px'}}>
          <div className='teacherprofile'  onClick={this.profile}  >
          <MDBView hover >
            <MDBIcon far icon="user green-text" size='5x' style={{display:'block', margin:'10px 0 20px 0', cursor:'pointer'}}/>
            <MDBMask className="flex-center" overlay="green-light">
            <h3 className="white-text" style={{cursor:'pointer'}}>Join tutor community</h3>
            </MDBMask>
          </MDBView>
          </div>
        </div>
        </div>
    </Paper>
    </div>
  );
}
}
export default HomeTeacher;
