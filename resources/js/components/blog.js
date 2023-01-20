import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import { MDBBtn, MDBInput, MDBIcon, MDBView, MDBCol, MDBRow, MDBCardImage,MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export default class Blog extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.remove = this.remove.bind(this)
        this.empty = this.empty.bind(this)
        this.removecourse = this.removecourse.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.state = {
            file: null,
            image: '',
            todos: [],
            text: '',
            description: '',
            pics: []
          }
         
      }
      remove(e) {
        const data = {file: e.target.value}
        axios.post('/remove', data)
        .then(response => {
          this.componentDidMount();
        });
      }
      onChangeText(e) {
        this.setState({
          text: e.target.value
        });
      }
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
      onFormSubmit(e){
        e.preventDefault() 
        this.fileUpload(this.state.image);
        
      }
      onChange(e) {
        this.setState({
                  file: URL.createObjectURL(e.target.files[0])
                }) 
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
      }
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }
      fileUpload(image){
        const formData = {file: image, text: this.state.text, description: this.state.description}
        return axios.post('/fileupload', formData)
                .then(response => {
                    this.setState({
                        text: '',
                        description: '',
                        file: ''
                      });
                      this.componentDidMount();
                });
      }
      componentDidMount(){
        axios.get('/pics')
        .then(response => {
            this.setState({
                pics: response.data
              });  
              ScrollReveal().reveal('#blogtext', { delay: 400 });
              ScrollReveal().reveal('#blogrem', { delay: 400 });
              ScrollReveal().reveal('#blogimage', {
                delay: 200,
                
            });
        });
        axios.get('/searchallmycourses')
                .then(response => {
                    this.setState({
                        todos: response.data,
                      });
                });

    }
    empty() {
      if(this.state.todos.length==0){
          return(
          <div className='UserSearch' style={{margin:'10px 0px 0px -18px'}}>
            <span style={{margin: '40px 0px 0px 421px'}}>No courses match your search</span> 
          </div>
          )
      }
  }
  removecourse(e) {
    const obj = {id: e.target.value}
    axios.post('/removecourse', obj)
                .then(response => {
                      this.componentDidMount();
                });
}
      render() {
       
        return (
          <div>

          <Paper style={{borderRadius:'10px', margin:'0 0 20px 0', backgroundColor: 'deepskyblue', color: 'white'}}><h1  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}} ><b> Courses </b></h1> </Paper>
          <MDBCard narrow style={{borderRadius:'10px', margin: '0 0 70px 0'}}>
          <ul style={{listStyleType: 'none'}}>
          {this.empty()}
          {this.state.todos.map(item => (
                     <li key={item.id}>
                       <div className='UserSearch' style={{ margin: '20px 0px 20px -18px'}}> 
                          <div className='UserSearchTopx'>
                          <MDBIcon far icon="file-pdf" size='3x' style={{margin: '25px 0 0 0'}}/>
                          </div>
                          <div className='UserSearchBottomx'>
                              <h3 style={{ margin: '21px 0 21px 0', textAlign:'center'}}>{item.coursename}</h3>
                          </div>
                          <div className='UserSearchEmailx' style={{ overflow:'hidden'}}>
                            <h5 style={{display: 'inline-block', marginTop: '37px', color:'gray'}} className='cut-text'>{item.info}</h5>
                          </div>
                          <div className='UserSearchYear' >
                         </div>
                         <div className='UserSearchBotton'>
                             <MDBBtn floating size="s" value={item.id} color="danger" onClick={this.removecourse} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px'}}><MDBIcon icon="times"/>  </MDBBtn>
                         </div>
                       </div>
                      </li>
                        ))}
            </ul>
            </MDBCard>
          <Paper style={{borderRadius:'10px', margin:'0 0 20px 0', backgroundColor: 'deepskyblue', color: 'white'}}><h1  style={{width:'100%', display: 'inline-block', textAlign: 'center', margin:'20px 0 20px 0'}} ><b> Upload Your Achievments </b></h1> </Paper>
            <MDBCard narrow style={{borderRadius:'10px'}}>
                    <div className="input-group" style={{margin:'0 0 0 20px'}} >
                    <form onSubmit={this.onFormSubmit} style={{width: '900px', margin: '10px 0 0 0'}}>
                        <div>
                        <MDBInput id='blogrem' style={{color:'black'}} label="Title"  value={this.state.text} onChange={this.onChangeText} required/>
                        <MDBInput id='blogrem' style={{color:'black'}} label="Description"  value={this.state.description} onChange={this.onChangeDescription} required/>
                        </div>
                        <div id='blogrem' className="input-group-prepend" style={{width: '900px', margin: '10px 0 0 0'}}>
                            <MDBBtn  color="primary"  type="submit" style={{borderRadius:'20px'}}>Upload   <MDBIcon icon="upload" /></MDBBtn>
                            <div className="custom-file" style={{width: '250px', margin: '10px 0 0 0'}}>
                                <MDBInput
                                type="file"
                                className="custom-file-input"
                                style={{width: '250px'}}
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={this.onChange}
                                />
                                <label className="custom-file-label" style={{width: '250px', cursor: 'pointer'}} htmlFor="inputGroupFile01">
                                Choose image
                                </label>
                            </div>
                        </div>
                    </form>
                    </div>
                    <img src={this.state.file} style={{maxWidth: '500px', maxHeight: '500px', margin: '8px 0 20px 170px'}} />
                  </MDBCard>
                <ScrollArea speed={0.8} className="area" contentClassName="content" scrollBottom={true} >
                    <div className="images" style={{margin:'20px 0 0 0'}}>
                    {this.state.pics.map(s => (
                      <React.Fragment key={s.id}>
                        <MDBRow>
                        <MDBCol>
                            <Paper id='blogtext' style={{ margin:'20px 0px'}}>
                              <h2  style={{width:'92%', display: 'inline-block', textAlign: 'center', margin:'20px 0 10px 0'}} > {s.toptext}</h2> 
                              <MDBBtn  floating id='blogrem' size="md" color="danger" value={s.id} onClick={this.remove} style={{float:'right', borderRadius:'20px', margin:'20px 20px 20px 0'}}><MDBIcon icon="times" /></MDBBtn>
                              <MDBView hover zoom>
                                <img  src={s.source} id='blogimage' className="rounded mx-auto d-block" alt="aligment" style={{maxWidth: '600px', maxHeight: '600px',minWidth:'400px',minHeight:'400px', margin: '25px 0 40px 0', borderRadius: '20px', alignSelf: 'center'}} />
                              </MDBView>
                              <h5  style={{width:'92%', display: 'inline-block', textAlign: 'center', margin:'20px 0 10px 0'}} > {s.bottomtext}</h5>
                            </Paper>
                        </MDBCol>
                        </MDBRow>
                      </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            
          </div>
        );
      }
    
}
