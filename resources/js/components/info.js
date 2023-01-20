import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBIcon } from "mdbreact";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';


export default class Info extends Component {
   
    constructor(props) {
        super(props);
        this.componentDidMount= this.componentDidMount.bind(this);
        this.onclicklang= this.onclicklang.bind(this);
        this.onclickcourse= this.onclickcourse.bind(this);
        this.onclickyear= this.onclickyear.bind(this);
        this.onclickuni= this.onclickuni.bind(this);
        this.onclickproject= this.onclickproject.bind(this);
        this.state = {
            lang: [],
            uni: [],
            proj: [],
            info: '',
            course: [],
            year: [],
            search:[],
         };
      }
      
      componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dummy !== this.props.dummy) {
            this.componentDidMount();
        }}
      componentDidMount(){
         axios.get("/all").then(response => {
             console.log(response.data[4])
                this.setState({
                               lang:response.data[4],
                               uni: response.data[1],
                               proj: response.data[5],
                               info: response.data[0][0]['extra_info'],
                               course: response.data[2],
                               year: response.data[3],
                            });
                            ScrollReveal().reveal('#blogrem', { delay: 200 });
                })
                
    }
    onclicklang(e){
        let obj = {
            s : e.currentTarget.getAttribute('value'),
        };
        console.log(obj);
        axios.post('/searchlang', obj)
              .then(res =>{
                this.setState({
                    search: res.data,
                  });
                  this.props.filterUser(res.data);
              });
    }
    onclickcourse(e){
        let obj = {
            s : e.currentTarget.getAttribute('value'),
        };
        axios.post('/searchcourse', obj)
              .then(res =>{
                this.setState({
                    search: res.data,
                  });
                  this.props.filterUser(res.data);
              });
    }
    onclickyear(e){
        let obj = {
            s : e.currentTarget.getAttribute('value'),
        };
        axios.post('/searchyear', obj)
              .then(res =>{
                this.setState({
                    search: res.data,
                  });
                  this.props.filterUser(res.data);
              });
    }
    onclickuni(e){
        let obj = {
            s : e.currentTarget.getAttribute('value'),
        };
        axios.post('/searchuni', obj)
              .then(res =>{
                this.setState({
                    search: res.data,
                  });
                  this.props.filterUser(res.data);
              });
    }
    onclickproject(e){
        let obj = {
            s : e.currentTarget.getAttribute('value'),
        };
        axios.post('/searchproject', obj)
              .then(res =>{
                this.setState({
                    search: res.data,
                  });
                  this.props.filterUser(res.data);
              });
    }

    // style={{ width: '210mm'}}
    render() {
        return (
            <Paper  style={{ margin:'70px 6px 70px 5px', display: 'flex', flexDirection: 'row', borderRadius:'10px' }} >
                <MDBContainer className="flexbox-container" style={{backgroundColor:'#f8f8f8'}}>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Languages
                        </Typography>
                        <hr/>
                        <ul>  
                            {this.state.lang.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclicklang}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        
                        </ul>
                    </div>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'> 
                        <Typography gutterBottom variant="h5" component="h2">
                        Courses
                        </Typography>
                        <hr/>
                        <ul>
                        {this.state.course.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickcourse}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                    <div className="part1" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Projects
                        </Typography>
                        <hr/>
                        <ul>
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
                        <ul>
                        {this.state.uni.map(x => x.map(s => s.id==null?'':((<Typography gutterBottom variant="h6" component="h6"><li key={s.id} value={s.id} style={{cursor: 'pointer'}}  onClick={this.onclickuni}><span style={{color:'#3b51c9'}}>{s.name}</span> <span style={{color:'#a8afab'}}>({x[1]})</span> <MDBIcon icon="mouse" style={{margin:'5px 0px',paddingRight:'5px', float:'right', color:'#a8afab'}}/></li></Typography>))))}
                        </ul>
                    </div>
                    <div className="part2" style={{ width: "22rem" }} id='blogrem'>
                        <Typography gutterBottom variant="h5" component="h2">
                        Years
                        </Typography>
                        <hr/>
                        <ul>
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
        );
    }
}
