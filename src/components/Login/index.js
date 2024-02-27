
import { Component } from "react";
import Cookies from 'js-cookie';

import './index.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Login extends Component{

    state={username1:'',password1:'',errorMessage:'',errorDisplay:false}


    loginDetails = async (event) => {

        event.preventDefault();
        const {username1,password1} = this.state
        const details = {username:username1,password:password1}

        const options = {
            method:'POST',
            body:JSON.stringify(details)
        }

        const response = await fetch('https://apis.ccbp.in/login',options)
        const resultData = await response.json()
        console.log(resultData);
        if(response.ok === true){
            const {history} = this.props
            console.log(this.props)
            const {jwt_token} = resultData
             Cookies.set('jwt_token',jwt_token,{expires:30})
             history.replace('/')
            
        }else{
            const {error_msg} = resultData
            console.log(error_msg)
            this.setState({errorMessage:error_msg,errorDisplay:true})
        }
    }

    changeDetailUsername= (event)=> {
        this.setState((prev) => ({username1:event.target.value,errorDisplay:false
        }))
    }

    changeDetailPassword= (event)=> {
        this.setState((prev) => ({password1:event.target.value,errorDisplay:false
        }))
    }

    

    render(){
        const {errorMessage,username1,password1,errorDisplay} = this.state
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken !== undefined){
            return <Redirect to="/"/>
        }

        return <div className="container">
            <img src="/images/Illustration.png" alt="website login" className="image-side"/>
            <div className="container-form">
                <div className="container-log-header-top">
                <img src="/images/logo.png" alt="website logo" className="image-logo"/>
                <h1 className="heading-logo">Insta Share</h1>
                </div>
                <form onSubmit={this.loginDetails}>
                    <div className="usermane-container">
                    <label htmlFor="username" className="username-label">USERNAME</label>
                    <input type="text" onChange={this.changeDetailUsername} id="username" className="username-input"/>
                    </div>
                    <div className="usermane-container">
                    <label  htmlFor="password" className="username-label">PASSWORD</label>
                    <input type="password" onChange={this.changeDetailPassword} className="username-input" id="password"/>
                    </div>
                    {errorDisplay && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="button-submit">Login</button>
                </form>
            </div>
        </div>
    }
}

export default Login;

