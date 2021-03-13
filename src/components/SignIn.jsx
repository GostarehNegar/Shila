import React, { Component } from "react";
import {    connect} from 'react-redux'
import { signIn } from "../store/actions/chatActions";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './signin.css'
const mapStateToProps = state => {
    return {
        messages: ''
    }
}
const mapDispatchToProps = dispatch => ({
    signIn :(userName, password)=>{
        dispatch(signIn(userName,password))
        setTimeout(()=>{
        window.location="/"
    },2000)
    }
// deleteConversation: id => {
//     dispatch(deleteConversation(id))

// }
})
export  class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.signIn(username, password);
        }
    }
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
            <form>
                <div style={{minHeight:"100px",}}></div>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button  className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
        );
    }
        
    
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer