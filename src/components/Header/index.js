
import { Link,withRouter,Redirect } from "react-router-dom";
import { Component } from "react";

import Cookies from "js-cookie";

import  DetailShare from '../ReactContextComp'


import { FaSearch } from "react-icons/fa";

import './index.css';

class Header extends Component{

    state={searchValue:''}

    getSearchValue = (event)=>{
        this.setState({searchValue:event.target.value})
    }

    clearPrevious = ()=> {
        this.setState({searchValue:''})
    }

    logoutPage = ()=> {
        const jwtToken = Cookies.remove('jwt_token');
        const {history} = this.props
        history.replace("/login")
    }

    

    render(){

        const {searchValue} = this.state
        
        return <DetailShare.Consumer>{
            value => {
                const {searchBox,displaySearch,clearSearchDetails1} = value
                
                const clickResultOfSearch = ()=> {
                    const {searchValue} = this.state
                    clearSearchDetails1()
                    this.clearPrevious()
                    displaySearch(searchValue)
                }

                const clearSearchValue = () => {
                    this.clearPrevious()
                    clearSearchDetails1()
                }

                 

                return (<div className="container-Header">
                <div className="box-1-container">
                    <Link to="/" className="header-logo-home"><img src="/images/logo.png" alt="website logo" className="logo"/></Link>
                
                    <p className="heading-desc">Insta Share</p></div>  
                <nav className="navigator-box">
                    <div className="search-box-container">
                    <input type="search" className="input-search-box" onChange={this.getSearchValue} value={searchValue} placeholder="Search Caption" />
                    <button type="button" onClick={clickResultOfSearch} className ="icon-search" testid="searchIcon">
        <FaSearch size={15}  color="#989898"/>
        </button>
                    </div>
                    <Link to="/" className="home-url" onClick={clearSearchValue}>Home</Link>
                    <Link to="/my-profile" className="home-url" onClick={clearSearchValue}>Profile</Link>
                    <button type="button" testid="searchIcon" onClick={this.logoutPage} className="button-logout">Logout</button>
                </nav>
            </div>)
        }
            }
            </DetailShare.Consumer>
    }
}

export default withRouter(Header)

