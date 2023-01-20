import React, {Component} from 'react';

export default class Header extends Component {

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-brand">
            {this.props.first}  {this.props.last} 
        </div>
      </nav>
    )
  }
}
