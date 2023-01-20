import React, { Component } from 'react';
import Info from './info';
import Profilepic from './inputfile';
import Oldteacher from './updateteacher';
import Blog from './blog';



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.filterUser = this.filterUser.bind(this);
        this.state = { dummy : new Date().getTime()};
      }
      filterUser(filterValue){
        this.props.filterUser(filterValue);
      }
      
      renderInfo (){
          return <Info
          dummy={this.state.dummy} filterUser={this.filterUser} />
        
      }
    renderRedirectoldteacher  (){
      return <Oldteacher
      onAnyChange={this.onChange} update={this.update} chat={this.chat} schedule={this.schedule} add={this.add}/>
    }
    renderBlog (){
      return <Blog/>
    }
    onChange = () => {
      this.setState({
          dummy : new Date().getTime()
      });
    };
    update = () => {
      this.props.update();
    }; 
    add = () => {
      this.props.add();
    }; 
    chat = () => {
      this.props.chat();
    }; 
    schedule = () => {
      this.props.schedule();
    };    

    
      render() {
        return (
          <div>
            {this.renderRedirectoldteacher()}
            {this.renderInfo()}
            {this.renderBlog()}
            
          </div>
        );
      }
    
}
