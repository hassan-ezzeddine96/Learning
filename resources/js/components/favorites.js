import React, { Component } from 'react';
import { MDBContainer,  MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

export default class Favorites extends Component {
    constructor(props) {
        super(props);
        this.componentWillMount=this.componentWillMount.bind(this);
        this.info = this.info.bind(this);
        this.empty = this.empty.bind(this);
        this.rem= this.rem.bind(this);
        this.state = {
            all: [],
         };
      }
      componentWillMount(){
        axios.get('/favx').then(response => {
            this.setState({
                all: response.data
            })
        });
       
    }
    info(e) {
        this.props.onAnyChange( e.target.value);
    }
    rem(e) {
        const obj={r: e.target.value}
        axios.post('/rem', obj).then(response => {
            this.setState({
                all: []
            })
          this.componentWillMount();
          
        });
    }
    empty() {

        if(this.state.all.length==0){
            return(
                <div className='UserSearch'>
                <span style={{margin: '40px 0px 0px 406px'}}>No tutor match your search</span> 
              </div>
            )
        }
    }
    
    render() {
        return (
        <MDBContainer>
            <Paper style={{borderRadius:'10px', margin:'0 40px 20px 40px',width:'96%', backgroundColor: 'deepskyblue', color: 'white'}}><h1  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}} ><b> Favorite Tutors</b></h1> </Paper>
            <ul >
                {this.empty()}
                {this.state.all.map(item => (
                <li key={item.id} style={{ margin: '40px 0 0 0',  listStyleType: 'none'}}>
                    <div className='UserSearch' style={{ margin: '20px 0 20px 0'}}>
                        <div className='UserSearchTop'>
                        <img  src= {item.source}  alt="Profile pic" />
                        </div>
                        <div className='UserSearchBottom'>
                            <h3 style={{ margin: '10px 0 5px 0'}}>{item.firstname} {item.lastname}</h3>
                            <h5 style={{ margin: '0px 0px 0px 0px', color:'gray'}}>{item.email}</h5>
                        </div>
                        <div className='UserSearchYear'>
                        <h5 style={{ margin: '37px 5px 18px 5px', color:'gray'}}>{item.age} years</h5>
                        </div>
                        <div className='UserSearchBotton'>
                            <MDBBtn floating size="s" value={item.id}gradient="blue" onClick={this.info} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px', textTransform: 'capitalize'}}><MDBIcon icon="sitemap" style={{margin:'0 10px 0 -10px'}} />   More Info</MDBBtn>
                            <MDBBtn floating size="s" value={item.id} color="danger" onClick={this.rem} style={{margin: '30px 5px 5px 5px',borderRadius:'20px'}}>  <MDBIcon icon="heart-broken" /> </MDBBtn>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </MDBContainer>
        );
    }
}
