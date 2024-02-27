
import { Component } from "react";

import { Redirect, Route } from "react-router-dom";

import Cookies from "js-cookie";

const ProtectedRoute = (props)=> {

    console.log("jhbjkh")
    console.log(props)

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

        if(jwtToken === undefined){
            return <Redirect to="/login" />
        }

        return <Route {...props} />
}
export default ProtectedRoute