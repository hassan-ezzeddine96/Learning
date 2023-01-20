import React, { Component } from 'react';
import { MDBContainer,  MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.info = this.info.bind(this);
        this.empty = this.empty.bind(this);
        this.state = {
            all: [],
         };
      }
      componentDidMount(){
        this.setState({
            all: this.props.dataFromParent,
          });
    }
    info(e) {
        this.props.onAnyChange( e.target.value);
    }
    empty() {
        if(this.state.all.length==0){
            return(
            <div className='UserCard'>
              <span style={{margin: '140px 0px 0px 180px'}}>No teacher match your search ....</span> 
            </div>
            )
        }
    }
    
    render() {
        return (
        <MDBContainer>
            <ul >
                {this.empty()}
                {this.state.all.map(item => (
                <li key={item.id} style={{ margin: '40px 0 0 0',  listStyleType: 'none' }}>
                    <div className='UserCard'>
                        <div className='UserCardTop'>
                        <img  src= {item.source}  alt="Profile pic" />
                        </div>
                        <div className='UserCardBottom'>
                            <h3>{item.firstname} {item.lastname}</h3>
                            <h4>Email:</h4>
                            <h5>{item.email}</h5>
                            <h4> Age:</h4>
                            <h5>{item.age}</h5>
                            <MDBBtn floating size="md" value={item.id}gradient="blue" onClick={this.info}><MDBIcon icon="sitemap" />   More Info..</MDBBtn>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </MDBContainer>
        );
    }
}
