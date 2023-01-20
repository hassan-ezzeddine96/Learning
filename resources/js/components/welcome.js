import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MDBContainer } from "mdbreact";

export default class Welcome extends Component {
    render() {
        return (
          <MDBContainer>
           
          </MDBContainer>
        );
      }
}

if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}
