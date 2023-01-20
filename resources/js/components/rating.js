import React from 'react';
import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBIcon, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import Typography from '@material-ui/core/Typography';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.view = this.view.bind(this);
        this.state = {
            users: [],
        };
    }
    componentDidMount(){
        axios.get("/rating").then(response => {
            this.renderUsers(response.data);
                
                 })
    }
    renderUsers (users) {
        users.map(user => {
            const newUser = {
                name: user.name,
                first: user.firstname,
                last: user.lastname,
                source: user.source,
                email: user.email,
                rate:user.rate,
                id:user.id
            };
            if (this.state.users.length > 0) {
                let users = [...this.state.users];
                users.push(newUser);
                this.setState({ users: users });
            } else {
                this.setState({ users: [newUser] });
            }
        });
    }
    view(e) {
        this.props.onAnyChange( e.target.value);
        this.props.back();
    }
    render() {
            const renderTeachers = this.state.users.map((item) => {
                return <li key={item.id} style={{ listStyleType: 'none', margin: '10px 5px 0 5px' }}>
                <div className='UserRate' >
                    <div className='UserRateTop'>
                    <img  src= {item.source}  alt="Profile pic" />
                    </div>
                    <div className='UserRateBottom'>
                        <h3 style={{margin:'10px 0px 18px'}}>{item.first} {item.last}</h3>
                        <h5 style={{margin:'0px 30px 6px'}}>{item.rate}<i key="rating" size="lg" className="fas fa-heart red-text" aria-hidden="true" style={{margin:'0 0 0 3px'}}></i></h5> 
                        <MDBBtn outline floating size="md" value={item.id} color="blue" onClick={this.view} style={{borderRadius:'20px'}}  ><i key="View Profile" className="far fa-eye blue-text" aria-hidden="true" style={{margin:'0 5px 0 0'}}></i>   View </MDBBtn>
                    </div>
                </div>
            </li>;
              });
        return (
            <div>
                <h2 style={{margin:'10px 200px 30px 400px'}} >Highest rated tutors</h2>
                <ul style={{listStyleType: 'none', textAlign: 'left', float: 'left', display: 'flex', flexDirection: 'row',width: '100%'}}>
                    {renderTeachers}
                </ul>
            </div>
        );
    }
}

export default Rating;
                    