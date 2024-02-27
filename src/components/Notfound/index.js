
import Header from "../Header"
import { Component } from "react";

import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Notfound extends Component{

    render(){

        return <div className="not-found-container">
        <img src="/images/erroring 1.png" alt="page not found" className="image-no-search-1" />
        <h1 className="not-found-search">Page Not Found</h1>
        <div className="container-description-1">
          <p className="not-found-search-description">
          We are Sorry, the page you requested cloud not be found.
        please go back to the homepage.
          </p>
        </div>
        <Link to="/" className="retry-login-home">
        <button type="button" className="button-not-found">Home Page</button>
        </Link>
        
      </div>
    }
}

export default Notfound;
