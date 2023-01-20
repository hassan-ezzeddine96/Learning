import React, { Component } from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBBtn, MDBIcon,  MDBContainer } from "mdbreact";
import axios from 'axios';
import Select from "react-dropdown-select";
import * as jsPDF from 'jspdf';

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.info = this.info.bind(this);
        this.download = this.download.bind(this);
        this.empty = this.empty.bind(this);
        this.done = this.done.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChangeLanguage = this.onChangeLanguage.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeCourse = this.onChangeCourse.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      this.state = {
        language : [],
        lang : [],
        years : [],
        year : [],
        courses : [],
        course : [],
        todos: this.props.dataFromParent,
        currentPage: 1,
        todosPerPage: 5,
        upperPageBound: 2,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 2,
      };
      this.handleClick = this.handleClick.bind(this);
      this.btnDecrementClick = this.btnDecrementClick.bind(this);
      this.btnIncrementClick = this.btnIncrementClick.bind(this);
      this.btnNextClick = this.btnNextClick.bind(this);
      this.btnPrevClick = this.btnPrevClick.bind(this);
      // this.componentDidMount = this.componentDidMount.bind(this);
      this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }
    onChangeLanguage(l) {
        this.setState({
          lang: l
        });
      }
      onChangeYear(l) {
        this.setState({
          year: l
        });
      }
      onChangeCourse(l) {
        this.setState({
          course: l
        });
      }
      onFormSubmit(e){
        e.preventDefault();
        this.setState({
          todos: [],
        });
        this.fileUpload();
      }
      fileUpload(){ 
        const obj = {
          lang: this.state.lang,
          course: this.state.course,
          year: this.state.year,
        };
        return axios.post('/searchresultcourses', obj)
                .then(response => {
                    this.setState({
                        todos: response.data,
                      });
                });
      }
    componentWillMount(){
        axios.get("/suniversity").then(response => {
       
            this.setState({university: response.data})
            // console.log(this.state);
            })
        axios.get("/slanguage").then(response => {
       
            this.setState({language: response.data})
            // console.log(this.state);
            })
        axios.get("/sprojects").then(response => {
 
            this.setState({projects: response.data})
            // console.log(this.state);
            })
        axios.get("/scourses").then(response => {
     
            this.setState({courses: response.data})
            // console.log(this.state);
            })
        axios.get("/syears").then(response => {
         
            this.setState({years: response.data})
            // console.log(this.state.years);
            })
        axios.get('/searchallcourses')
                .then(response => {
                    this.setState({
                        todos: response.data,
                      });
                });
      
    }
    componentDidUpdate() {
          $("ul li.active").removeClass('active');
          $('ul li#'+this.state.currentPage).addClass('active');
    }
    handleClick(event) {
      let listid = Number(event.target.id);
      this.setState({
        currentPage: listid
      });
      $("ul li.active").removeClass('active');
      $('ul li#'+listid).addClass('active');
      this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
      let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
      this.setState({isNextBtnActive: 'disabled'});
      this.setState({isPrevBtnActive: 'disabled'});
      if(totalPage === listid && totalPage > 1){
          this.setState({isPrevBtnActive: ''});
      }
      else if(listid === 1 && totalPage > 1){
          this.setState({isNextBtnActive: ''});
      }
      else if(totalPage > 1){
          this.setState({isNextBtnActive: ''});
          this.setState({isPrevBtnActive: ''});
      }
  }
    btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
  }
    btnDecrementClick() {
      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      let listid = this.state.upperPageBound - this.state.pageBound;
      this.setState({ currentPage: listid});
      this.setPrevAndNextBtnClass(listid);
  }
  btnPrevClick() {
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
  }
  info(e) {
    this.props.onAnyChange( e.target.value);
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
empty() {
    if(this.state.todos.length==0){
        return(
        <div className='UserSearch'>
          <span style={{margin: '40px 0px 0px 364px'}}>No courses match your search ....</span> 
        </div>
        )
    }
}
done() {
    this.setState({
        course: [],
        lang:[],
        year:[]
      });
}
    render() {
      const { todos, currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      // Logic for displaying current todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
      const renderTodos = currentTodos.map(item => {
        return <li key={item.id}>
        <div className='UserSearch' style={{ margin: '20px 0 20px 0'}}>
            <div className='UserSearchTopx'>
            <MDBIcon far icon="file-pdf" size='3x' style={{margin: '25px 0 0 0'}}/>
            </div>
            <div className='UserSearchBottomx'>
                <h3 style={{ margin: '21px 0 21px 0', textAlign:'center'}}>{item.coursename}</h3>
            </div>
            <div className='UserSearchEmailx' style={{ overflow:'hidden'}}>
              <h5 style={{display: 'inline-block', marginTop: '37px', color:'gray'}} className='cut-text'>{item.info}</h5>
            </div>
            <div className='UserSearchYearx'>
            <MDBBtn floating size="s" value={item.source}gradient="sunny-morning"  onClick={this.download} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px', textTransform: 'capitalize'}}><MDBIcon icon="file-download" style={{margin:'0 10px 0 -10px'}}/>Download</MDBBtn>
            </div>
            <div className='UserSearchBottonx'>
                <MDBBtn  size="s" value={item.user_id}gradient="blue" onClick={this.info} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px', textTransform: 'capitalize '}}><MDBIcon icon="sitemap" style={{margin:'0 10px 0 -10px'}} />Blog</MDBBtn>
            </div>
        </div>
    </li>;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          if(number === 1 && currentPage === 1){
              return(
                <MDBPageItem>
                    <MDBPageNav className="page-link">
                    <li key={number} className='active' id={number} style={{fontSize: 'xx-large',margin:'0 50px'}}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                    </MDBPageNav>
                </MDBPageItem>
                  
              )
          }
          else if((number < upperPageBound + 1) && number > lowerPageBound){
              return(
                <MDBPageItem>
                    <MDBPageNav className="page-link">
                    <li key={number} id={number} style={{fontSize: 'xx-large',margin:'0 50px'}}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                    </MDBPageNav>
                </MDBPageItem>
                  
              )
          }
      });
      let pageIncrementBtn = null;
      if(pageNumbers.length > upperPageBound){
          pageIncrementBtn = <MDBPageItem >
                                <MDBPageNav className="page-link" aria-label="Previous" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                                <a href='#' onClick={this.btnIncrementClick}> &hellip; </a>
                                </MDBPageNav>
                            </MDBPageItem>
      }
      let pageDecrementBtn = null;
      if(lowerPageBound >= 1){
          pageDecrementBtn = <MDBPageItem >
                                <MDBPageNav className="page-link" aria-label="Previous" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                                <a href='#' onClick={this.btnDecrementClick}> &hellip; </a>
                                </MDBPageNav>
                            </MDBPageItem>
      }
      let renderPrevBtn = null;
      if(isPrevBtnActive === 'disabled') {
          renderPrevBtn = <MDBPageItem disabled>
                                <MDBPageNav className="page-link" aria-label="Previous" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                                &laquo;
                                </MDBPageNav>
                            </MDBPageItem>
      }
      else{
          renderPrevBtn = <MDBPageItem>
                            <MDBPageNav className="page-link" aria-label="Previous" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                            <span aria-hidden="true"><a href='#' id="btnPrev" onClick={this.btnPrevClick}>&laquo;</a></span>
                            </MDBPageNav>
                        </MDBPageItem>
      }
      let renderNextBtn = null;
      if(isNextBtnActive === 'disabled') {
          renderNextBtn = <MDBPageItem disabled>
                                <MDBPageNav className="page-link" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                                &raquo;
                                </MDBPageNav>
                            </MDBPageItem>
      }
      else{
          renderNextBtn = <MDBPageItem >
                            <MDBPageNav className="page-link" style={{fontSize: 'xx-large',margin:'0 50px'}}>
                            <a href='#' id="btnNext" onClick={this.btnNextClick}> &raquo;</a>
                            </MDBPageNav>
                        </MDBPageItem>
      }
      return (
          <div>
            <div>
            <h2 style={{margin:'10px 400px 30px 400px'}} >Search courses</h2>
            <form onSubmit={this.onFormSubmit} >
                <MDBContainer style={{ backgroundColor: 'white'}} >
                    <div className="shadow-box-example hoverable" style={{width:'250px',display:'inline-flex', borderRadius:'20px'}}>
                    <Select id='language' options={this.state.language} values={this.state.lang}  style={{width:'250px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeLanguage(l)} placeholder="Language   " />
                    </div>
                    <div className="shadow-box-example hoverable" style={{width:'250px',display:'inline-flex', borderRadius:'20px'}}>
                    <Select id='years'options={this.state.years} values={this.state.year} style={{width:'250px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true' labelField='name' valueField='id' onChange={(l) => this.onChangeYear(l)} placeholder="Class   " />
                    </div>
                    <div className="shadow-box-example hoverable" style={{width:'250px',display:'inline-flex', borderRadius:'20px'}}>
                    <Select id='courses'options={this.state.courses} values={this.state.course} style={{width:'250px', borderColor:'#1aafff', borderRadius:'20px'}} closeOnScroll = 'true'  labelField='name' valueField='id' onChange={(l) => this.onChangeCourse(l)} placeholder="Subject   " />
                    </div>
                    <MDBBtn color="primary" size='md' type="submit" style={{borderRadius:'20px'}} > Search  <MDBIcon fab icon="searchengin" /> </MDBBtn>
                    <MDBBtn color="warning" size='md'  style={{borderRadius:'20px'}} onClick={this.done} > <MDBIcon icon="times" /> </MDBBtn>
                </MDBContainer>
            </form >
            </div>
            <div style={{margin:'0px 23px 0px -25px'}}>
            <ul style={{listStyleType: 'none'}}>
            {this.empty()}
                {renderTodos}
            </ul>
            <MDBRow>
                <MDBCol>
                    <MDBPagination circle >
                    {renderPrevBtn}
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    {renderNextBtn}
                    </MDBPagination>
                </MDBCol>
                </MDBRow>
            </div>
        </div>
      );
    }
  }