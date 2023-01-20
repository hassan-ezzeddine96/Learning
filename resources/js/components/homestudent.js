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
import _ from 'lodash';


export class HomeStudent extends Component {
  constructor(props) {
    super(props);
    this.profile = this.profile.bind(this);
    this.courses = this.courses.bind(this);
    this.search = this.search.bind(this);
    this.go = this.go.bind(this);
    this.state = {
      students:[],
      teacher: true,
      flag:'false',
      nbstudent:0,
    }
    axios.get("/check").then(response => {
     
      this.setState({teacher: response.data})
      })
      axios.get("/check2").then(response => {
     
        this.setState({flag: response.data})
        })
        axios.get("/getnumberstudentsin").then(response => {
     
          this.setState({nbstudent: response.data})
          })
  }
  componentWillMount(){
    axios.get("/getstudentsin").then(response => {
      this.setState({students:response.data})
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
  courses(){
    this.props.courses();
  }
  search(){
    this.props.searchs();
  }
  go(e){
    this.props.go(e)
  }
  choose(){
    if(!this.state.flag || this.state.teacher ){
    }
    else{
      if(this.state.students.length!=0){
        let x =0;
        let names=_(this.state.students)
        .map(messageKey => {
            let cloned = _.clone(this.state.students[x]['name']);
            x=x+1;
            return cloned;
        })
        .value();
        let y =0;
        let images=_(this.state.students)
        .map(messageKey => {
            let cloned = _.clone(this.state.students[y]['source']);
            y=y+1;
            return cloned;
        })
        .value();
        let z =0;
        let ids=_(this.state.students)
        .map(messageKey => {
            let cloned = _.clone(this.state.students[z]['id']);
            z=z+1;
            return cloned;
        })
        .value();
      return(
        <div>
          <div style={{textAlign:'center', margin:'20px 0 10px 0'}}>
            <h1 style={{ display:'block'}}>Find your colleagues</h1>
          </div>
          <Paper style={{ margin:'70px 6px 70px 5px', display: 'flex', flexDirection: 'row', borderRadius:'10px' }} >
            <div className='studentleftx'>
                <Container mynames={names} myimages={images} myids={ids} go={this.go}/>
            </div>
            <div className='studentrightxx'>
            <div style={{ display: 'inline-flex', flexDirection: 'column', textAlign: 'center', margin:'88px 145px 0px '}}>
          <h1 style={{margin:'-30px 0px 10px 0px', borderBottom:'solid 0.5px', paddingBottom:'10px',color:'blue'}}>{this.state.nbstudent}</h1>
              <div>
                <h4 style={{color:'green'}}>students</h4>
                <h6>in your class you can chat with</h6>
              </div>
            </div>
            </div>
          </Paper>
        </div>
      )
      }
    }
  }
  render(){
  return (
    <div>
    <Paper style={{ margin:'70px 6px 70px 5px', display: 'flex', flexDirection: 'row', borderRadius:'10px' }} >
        <div className='studentleft'>
            <h4 style={{margin:'20px 0 5px 0', color:'burlywood'}}>Choose the best</h4>
            <h2>Education for your future</h2>
            <hr style={{width:'30%', color:'burlywood', border: 'solid 1px'}}/>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
              <div className='studentprofile'   onClick={this.profile}>
                <MDBView hover >
                  <MDBIcon far icon="user green-text" size='4x' style={{display:'block', margin:'10px 0 20px 0', cursor:'pointer'}}/>
                  <MDBMask className="flex-center" overlay="green-light">
                  <h3 className="white-text" style={{cursor:'pointer'}}>Edit profile info</h3>
                  </MDBMask>
                </MDBView>
              </div>
              <div  className='studentsearch' onClick={this.search}>
              <MDBView hover >
                  <MDBIcon  icon="search green-text" size='4x' style={{display:'block', margin:'10px 0 20px 0', cursor:'pointer'}}/>
                  <MDBMask className="flex-center" overlay="green-light">
                  <h3 className="white-text" style={{cursor:'pointer'}}>Search for tutors</h3>
                  </MDBMask>
                </MDBView>
              </div>
            </div>
            <div  onClick={this.courses}>
                <MDBView hover >
                  <MDBIcon icon="book-open green-text" size='4x' style={{display:'block', cursor:'pointer'}}/>
                  <MDBMask className="flex-center" overlay="green-light">
                  <h3 className="white-text" style={{cursor:'pointer'}}>Look for courses</h3>
                  </MDBMask>
                </MDBView>
              </div>
        </div>
        <div className='studentright'>
        <MDBView hover>
              <img
              className="myimage"
              src="/images/welcome/education-learning-company-service-professional-student-removebg-preview.png"
              alt="Second slide"
             height= '285px'
             style={{ margin: '15px 0 0 100px'}}
              />
              <MDBMask className="flex-center" overlay="blue-light">
                <h3 className="white-text">Welcome Students</h3>
              </MDBMask>
        </MDBView>
        </div>
    </Paper>
    {this.choose()}
    </div>
  );
}
}
export default HomeStudent;


class Page extends React.Component {
  componentWillUnmount() {
    this.props.onComponentWillUnmount();
  }
  handleInput(e) {
    this.props.go(e.target.value);
}
  
  render() {
    return (
      <div key={this.props.color2} className="item">
         <img  src={this.props.color1}  className="rounded mx-auto d-block" alt="aligment" style={{maxWidth: '90px', maxHeight: '90px',minWidth:'70px',minHeight:'70px', margin:'20px', alignSelf: 'center'}} />
         <div key={this.props.color2} style={{display:'inline-flex'}}>
         <h3>{this.props.color}</h3>
         <MDBBtn size='sm' key={this.props.color2} value={this.props.color2} onClick={e => this.handleInput(e, "value")} style={{margin: '0 0 0 20px'}} color='info' ><MDBIcon far icon="comments" style={{cursor:'pointer'}}/></MDBBtn>
         </div>
      </div>
    );
  }
}

class PaginatorArrow extends React.Component {
  render() {
    const className = "paginator-button paginator-button--" + this.props.arrowDirection;
    return (
      <button className={className} onClick={this.props.clickHandler}></button>
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
    
    this.state = {
      currentItem: 0,
      direction: 'forwards',
      preventClickEvents: false,
      colors: this.props.mynames,
      colors1: this.props.myimages,
      colors2: this.props.myids,
    }
    
    
    this.moveToNextItem = this.moveToNextItem.bind(this);
    this.moveToPreviousItem = this.moveToPreviousItem.bind(this);
    this.resetClickEvents = this.resetClickEvents.bind(this);
  }
  go(e){
    this.props.go(e)
  }
	
	render() {
    const currentItemIndex = this.state.currentItem;
    
		return (
		 	<div className="containerx">
        
        <PaginatorArrow arrowDirection="left"  clickHandler={this.moveToPreviousItem} />
        
				<div className="animation-containerx">
          <Page 
            key={currentItemIndex} 
            currentItem={currentItemIndex} 
            color={this.state.colors[currentItemIndex]}
            color1={this.state.colors1[currentItemIndex]}
            color2={this.state.colors2[currentItemIndex]}
            onComponentWillUnmount={this.resetClickEvents}
            go={this.go}/>
          
				</div>
        
        <PaginatorArrow arrowDirection="right" clickHandler={this.moveToNextItem}/>
        
			</div>
		);
	}
	
	moveToNextItem() {
    if (this.state.preventClickEvents) {
      return;
    }
    
		let nextItem = this.state.currentItem + 1;
    if (nextItem >= this.state.colors.length ) {
      nextItem = 0;
    }
    
		this.setState({
      direction: 'forwards',
			currentItem: nextItem,
      preventClickEvents: true
		});
	}
  
  moveToPreviousItem() {
    if (this.state.preventClickEvents) {
      return;
    }
    
		let nextItem = this.state.currentItem - 1;
    if (nextItem < 0 ) {
      nextItem = this.state.colors.length - 1;
    }
    
		this.setState({
      direction: 'backwards',
			currentItem: nextItem,
      preventClickEvents: true
		});
	}
  
  resetClickEvents() {
    this.setState({
      preventClickEvents: false
    });
  }
}
