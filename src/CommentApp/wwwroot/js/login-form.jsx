import React, { Component } from 'react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.errorMessage = '';
        this.state = {errorMessage : ""};
    }
    render() {
        return (
            <div id="LoginForm">
                <label >User Name: </label>
                <input ref="userName" type="text" id="UserName"/>
                <input type="button" id="LoginSubmit" value="Login" className="btn btn-warning" onClick={this.handleLoginSubmit}/>
                { (this.errorMessage) && <div className="error">{this.errorMessage}</div> }
            </div>
        );
    }

    handleLoginSubmit() {

        //Initialize username and error message
        let userName = this.refs.userName.value;
        this.errorMessage = '';

        //Redirect to Comment page
        if(userName) {
            location.hash += `${userName}/comment`;
        }
        else{
            this.errorMessage = 'Please fill your username!';            
        }

        //Update message if there is any error
        this.setState({errorMessage: this.errorMessage});
    }

    
}