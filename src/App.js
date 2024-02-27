import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { Component } from "react";


import Login from './components/Login';
import Home from './components/Home';
import MyProfile from './components/Myprofile'
import UserProfileDetails from './components/userProfileDetails';


import DetailShare from './components/ReactContextComp'

import Notfound from './components/Notfound'

import ProtectedRoute from './components/ProtectedRoure'

import './App.css';


class App extends Component {

  state = {searchBox:''} 

   displaySearch = (searchValue)=> {
    
    this.setState({searchBox:searchValue})
   }

   clearSearchDetails1= ()=>{
    this.setState({searchBox:''})
   }

  render() {
    const {searchBox} = this.state
    console.log(`${searchBox} App`)
    return <DetailShare.Provider value={{searchBox,displaySearch:this.displaySearch,clearSearchDetails1:this.clearSearchDetails1
    }}>
    (
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <ProtectedRoute exact path="/" component={Home}/>
              <ProtectedRoute exact path="/users/:id" component={UserProfileDetails}/>
              <ProtectedRoute exact path="/my-profile" component={MyProfile}/>
              <Route component={Notfound}/>
            </Switch>
            </BrowserRouter>
        )
    </DetailShare.Provider>
  }
}

export default App;

