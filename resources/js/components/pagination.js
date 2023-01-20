import React, { Component } from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBBtn, MDBIcon } from "mdbreact";

export default class Pagination extends Component {
    constructor(props) {
      super(props);
      this.info = this.info.bind(this);
        this.empty = this.empty.bind(this);
      this.state = {
        todos: this.props.dataFromParent,
        flag:this.props.newdata,
        currentPage: 1,
        todosPerPage: 5,
        upperPageBound: 2,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 2
      };
      this.handleClick = this.handleClick.bind(this);
      this.btnDecrementClick = this.btnDecrementClick.bind(this);
      this.btnIncrementClick = this.btnIncrementClick.bind(this);
      this.btnNextClick = this.btnNextClick.bind(this);
      this.btnPrevClick = this.btnPrevClick.bind(this);
      // this.componentDidMount = this.componentDidMount.bind(this);
      this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }
    componentWillMount(){
      console.log(this.state.flag)
      if(this.state.flag==0){
        axios.get('/searchallteachers')
                .then(response => {
                    this.setState({
                        todos: response.data,
                      });
                });
      }
      
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
empty() {
    if(this.state.todos.length==0){
        return(
        <div className='UserSearch'>
          <span style={{margin: '40px 0px 0px 364px'}}>No tutor match your search </span> 
        </div>
        )
    }
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
                <MDBBtn floating size="s" value={item.id}gradient="blue" onClick={this.info} style={{ margin: '30px 5px 5px 5px', borderRadius:'20px'}}><MDBIcon icon="sitemap" style={{margin:'0 10px 0 -10px'}} />   More Info</MDBBtn>
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
      );
    }
  }