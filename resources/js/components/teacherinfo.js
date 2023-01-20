import React, { Component } from 'react';
import { MDBContainer,  MDBBtn, MDBIcon, MDBListGroup,MDBCard, MDBListGroupItem, MDBView, MDBCol, MDBRow, MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";
import axios from 'axios';
import MainChat from './chatting/MainChat';
import Schedual from './schedual';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

// import 'react-chat-widget/lib/styles.css';

export default class Teacherinfo extends Component {
    constructor(props) {
        super(props);
        this.returnx = this.returnx.bind(this);
        this.like = this.like.bind(this);
        this.download = this.download.bind(this);
        this.empty = this.empty.bind(this);
        this.chat = this.chat.bind(this);
        this.schedule = this.schedule.bind(this);
        this.chats = this.chats.bind(this);
        this.schedules = this.schedules.bind(this);
        this.onclicklang= this.onclicklang.bind(this);
        this.onclickcourse= this.onclickcourse.bind(this);
        this.onclickyear= this.onclickyear.bind(this);
        this.onclickuni= this.onclickuni.bind(this);
        this.onclickproject= this.onclickproject.bind(this);
        this.state = {
            x:false,
            y:false,
            rend: true,
            id: this.props.dataFromParent,
            first: '',
            last: '',
            age: '',
            email: '',
            todos:[],
            preview: '/images/XXfdOcsLvZ.png',
            lang: [],
            uni: [],
            proj: [],
            info: '',
            course: [],
            year: [],
            pics: [],
            hide: false,
            search:[],
         };
      }
      // handleNewUserMessage = (newMessage) => {
      //   console.log(`New message incomig! ${newMessage}`);
      //   // Now send the message throught the backend API
      // }
      returnx() {
        this.props.onAnyChange();
    }
    componentWillMount(){
      // addResponseMessage("Welcome to this awesome chat!");
        const obj={id: this.props.dataFromParent};
        axios.post('/checkx', obj).then(response => {
          console.log(response.data)
            this.setState({
                hide: response.data
              }); 
         axios.post("/profilx", obj ).then(response => {
            if(response.data != "nothing"){      
                this.setState({preview: response.data[0]['source']})
            }
            })
        axios.post("/allx", obj).then(response => {
          this.setState({first: response.data[0][0]['firstname'],
                         last: response.data[0][0]['lastname'],
                         email: response.data[0][0]['email'],
                         age: response.data[0][0]['age'],
                         lang:response.data[4],
                         uni: response.data[1],
                         proj: response.data[5],
                         info: response.data[0][0]['extra_info'],
                         course: response.data[2],
                         year: response.data[3],
                      });    
          })
        axios.post('/picsx', obj).then(response => {
              this.setState({
                  pics: response.data
                }); 
                ScrollReveal().reveal('#blogtext', { delay: 400 });
                ScrollReveal().reveal('#blogimage', {
                  delay: 200,
              });
          
          });
          axios.post('/searchallmycoursesx',obj)
          .then(response => {
              this.setState({
                  todos: response.data,
                });
          });
        
             
        });
          this.setState({rend: false})
    }
        
    
    
    like(e) {
        const obj={id: this.state.id};
        axios.post('/favorite', obj).then(response => {
                this.setState({hide : true})
        });
    }
    onclicklang(e){
      let obj = {
          s : e.currentTarget.getAttribute('value'),
          id: this.props.dataFromParent
      };
      axios.post('/searchlangs', obj)
            .then(res =>{
              this.setState({
                  search: res.data,
                });
                this.props.filterUser(this.state.search);
            });
  }
  onclickcourse(e){
      let obj = {
          s : e.currentTarget.getAttribute('value'),
          id: this.props.dataFromParent
      };
      axios.post('/searchcourses', obj)
            .then(res =>{
              this.setState({
                  search: res.data,
                });
                this.props.filterUser(this.state.search);
            });
  }
  onclickyear(e){
      let obj = {
          s : e.currentTarget.getAttribute('value'),
          id: this.props.dataFromParent
      };
      axios.post('/searchyears', obj)
            .then(res =>{
              this.setState({
                  search: res.data,
                });
                this.props.filterUser(this.state.search);
            });
  }
  onclickuni(e){
      let obj = {
          s : e.currentTarget.getAttribute('value'),
          id: this.props.dataFromParent
      };
      axios.post('/searchunis', obj)
            .then(res =>{
              this.setState({
                  search: res.data,
                });
                this.props.filterUser(this.state.search);
            });
  }
  onclickproject(e){
      let obj = {
          s : e.currentTarget.getAttribute('value'),
          id: this.props.dataFromParent
      };
      axios.post('/searchprojects', obj)
            .then(res =>{
              this.setState({
                  search: res.data,
                });
                this.props.filterUser(this.state.search);
            });
  }
  schedules  () {
    this.setState({
      x:!this.state.x,
      y:false,
    })
  };
  chats  () {
    this.setState({
      y:!this.state.y,
      x:false,
    })
  };
  schedule  () {
    if(this.state.x){
    return(
      <Schedual data = {this.state.id}/>
    )
    }
  };
  chat  () {
    if(this.state.y){
    return(
      <MainChat data = {this.state.id}/>
    )
    }
  };
  empty() {
    if(this.state.todos.length==0){
        return(
        <div className='UserSearch' style={{margin:'10px 0px 0px -18px'}}>
          <span style={{margin: '40px 0px 0px 364px'}}>No courses match your search ....</span> 
        </div>
        )
    }
    
}
download(e) {
  const obj = {
      source: e.target.value,
    };
  axios({
      url: '/downloadcourse',
      method: 'POST',
      data: obj,
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       let $s = obj['source'].replace("images/courses/","");
       link.setAttribute('download', $s); //or any other extension
       document.body.appendChild(link);
       link.click();
    });
}   
    render() {
        return (
        <MDBContainer>
          {/* <Widget message
              handleNewUserMessage={this.handleNewUserMessage}
              title="My new awesome title"
              subtitle="And my cool subtitle"
              /> */}
                <MDBBtn color="primary" onClick={this.returnx} style={{ margin: '0px 0px 20px 0px', borderRadius:'20px'}}><div className='backicon'><MDBIcon icon="angle-double-left" style={{margin:'0 20px 0 0' }} />  Return   </div> </MDBBtn>
                <div >
                    <div className='UserCard' style={{ margin:'20px 0 70px 0px' }}>
                        <div className='UserCardTop'>
                        <img  src= {this.state.preview}  alt="Profile pic" />
                        </div>
                        <div className='UserCardBottom'>
                        <div style={{display: 'flex', flexDirection: 'row', margin:'0px 0px 0px 160px'}}>
                          <h2 style={{margin:'13px 0px 0px 0px'}}>{this.state.first} {this.state.last}</h2>
                          <div style={{border: '4px double lightcoral', width: '44px', height: '39px', margin:'13px 0 0 20px', backgroundImage:'url(/images/welcome/Webp.net-resizeimage9.jpg)'}}>
                              <span style={{margin:'0px -18px 0px 2px'}} className={this.state.hide? 'hidden' : ''}><MDBIcon icon="heart" size="2x" style={{ cursor: 'pointer'}} className='red-text pr-3' onClick={this.like} /></span>
                          </div>
                        </div>
                        <h5 style={{ margin:'13px 0px 0px 160px'}} >{this.state.email}</h5>
                        <h5 style={{margin:'13px 0px 0px 160px'}}>{this.state.age} years old</h5>
                        </div>
                        <div className='UserCardUpdate'>
                          <MDBBtn
                              color="success"
                              className="mb-2"
                              onClick={this.chats}
                              style={{width:'172px', margin:'40px 0px 0px 0px'}}
                          >
                              Chat
                              <i className="far fa-comments white-text " style={{margin:'0 0 0 10px' }}></i>
                          </MDBBtn>
                          <MDBBtn
                              color="info"
                              className="mb-2"
                              onClick={this.schedules}
                              style={{width:'172px', margin:'0px 0px 0px 0px'}}
                          >
                              Schedule
                              <i className="far fa-calendar-check white-text" style={{margin:'0 0 0 10px' }}></i>
                          </MDBBtn>
                          </div>
                    </div>
              </div>
              <div>
                {this.chat()}
                {this.schedule()}
              </div>
            {/* <MDBModal
              isOpen={this.state.modal}
              toggle={this.toggle}
              fullHeight position="right"
            >
              <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
              <MDBModalBody>
                <MainChat data = {this.state.id}/>
              </MDBModalBody>
            </MDBModal>
            <MDBModal
              isOpen={this.state.modal2}
              toggle={this.schedual}
              fullHeight position="right"
            >
              <MDBModalHeader toggle={this.schedual}></MDBModalHeader>
              <MDBModalBody>
               <Schedual data = {this.state.id}/>
              </MDBModalBody>
            </MDBModal> */}
            <Paper style={{ margin:'70px 6px 70px 5px', display: 'inline-flex', width:'100%', flexDirection: 'row', borderRadius:'10px' }} >
                <MDBContainer className="flexbox-container" style={{backgroundColor:'#f8f8f8'}}>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Languages
                        </Typography>
                        <hr/>
                        <ul key={this.state.id}>  
                            {this.state.lang.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclicklang}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        
                        </ul>
                    </div>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'> 
                        <Typography gutterBottom variant="h5" component="h2">
                        Courses
                        </Typography>
                        <hr/>
                        <ul key={this.state.id}>
                        {this.state.course.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickcourse}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Projects
                        </Typography>
                        <hr/>
                        <ul key={this.state.id}>
                        {this.state.proj.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickproject}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                </MDBContainer>
                <MDBContainer className="flexbox-container" style={{backgroundColor:'#f0f0f0'}}>
                    <div className="part22" style={{ width: "22rem" }} id='blogrem'> 
                        <Typography gutterBottom variant="h5" component="h2">
                        University
                        </Typography>
                        <hr/>
                        <ul key={this.state.id}>
                        {this.state.uni.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickuni}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                    <div className="part2" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Years
                        </Typography>
                        <hr/>
                        <ul key={this.state.id}>
                        {this.state.year.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickyear}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                    <div className="part2" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Additional Information
                        </Typography>
                        <hr/>
                        <Typography gutterBottom variant="h6" component="h6" style={{margin:'0 0 0 40px'}}>{this.state.info}</Typography>
                    </div>
                </MDBContainer>
            </Paper>
            <Paper style={{borderRadius:'10px', margin:'0 0 20px 0', backgroundColor: 'deepskyblue', color: 'white'}}><h1  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}} ><b> My Courses </b></h1> </Paper>
            <MDBCard narrow style={{borderRadius:'10px', margin: '0 0 70px 0'}}>
          <ul style={{listStyleType: 'none'}}>
          {this.empty()}
          {this.state.todos.map(item => (
                     <li key={item.id}>
                    <div className='UserSearch' style={{ margin: '20px 0 20px -18px'}}>
                      <div className='UserSearchTop'>
                      <MDBIcon far icon="file-pdf" size='3x' style={{margin: '25px 0 0 0'}}/>
                      </div>
                      <div className='UserSearchBottom'>
                          <h3 style={{ margin: '25px 0 25px 0', textAlign:'center'}}>{item.coursename}</h3>
                      </div>
                      <div className='UserSearchEmaily' style={{ overflow:'hidden'}}>
                        <h4 style={{display: 'inline-block', marginTop: '38px'}} className='cut-text'>{item.info}</h4>
                      </div>
                      <div className='UserSearchBotton'>
                      <MDBBtn floating size="s" value={item.source}gradient="sunny-morning"  onClick={this.download} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px'}}><MDBIcon icon="file-download" style={{margin:'0 10px 0 -10px'}} />   Download</MDBBtn>
                      </div>
                  </div>
                 </li>
                        ))}
            </ul>
            </MDBCard>
            <Paper style={{borderRadius:'10px', margin:'0 0 20px 0', backgroundColor: 'deepskyblue', color: 'white'}}><h1  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}} ><b> My Achievments </b></h1> </Paper>
            <div className="images">
                    {this.state.pics.map(s => (
                      <React.Fragment key={s.id}>
                        <MDBRow>
                        <MDBCol>
                        <Paper id='blogtext' style={{ margin:'20px 0px'}}>
                              <h2  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 10px 0'}} > {s.toptext}</h2> 
                              <MDBView hover zoom>
                                <img  src={s.source} id='blogimage' className="rounded mx-auto d-block" alt="aligment" style={{maxWidth: '600px', maxHeight: '600px',minWidth:'400px',minHeight:'400px', margin: '25px 0 25px 0', borderRadius: '20px', alignSelf: 'center'}} />
                              </MDBView>
                              <h5  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 10px 0'}} > {s.bottomtext}</h5>
                        </Paper>
                        </MDBCol>
                        </MDBRow>
                      </React.Fragment>
                        ))}
            </div>
        </MDBContainer>
        );
    }
}
