import Header from "../Header"
import { Component } from "react";

import Cookies from "js-cookie";

import Loader from 'react-loader-spinner';

import { BsGrid3X3 } from "react-icons/bs";

import SearchResult from '../SearchResult'


import  DetailShare from '../ReactContextComp'



import './index.css';


const StoryImage = (props) => {
    const {details} = props;
    const {image} = details

    return <li>
        <img src={image} alt="my story" className="image-story"/>
    </li>
}

const StoryImage1 = (props) => {
    const {details} = props;
    const {image} = details

    return <li>
        <img src={image} alt="my post" className="image-story-1"/>
    </li>
}

class MyProfile extends Component{

    state ={myprofileDetails:{},loadindStatus:false,}

    componentDidMount(){
        this.getMyProfileDetails()
    }

    getMyProfileDetails = async()=> {
        const jwtToken = Cookies.get('jwt_token');
      
      const options = {
          
          headers:{
              Authorization:`Bearer ${jwtToken}`,
          },
          method:"GET"
      }
      const response = await fetch("https://apis.ccbp.in/insta-share/my-profile",options)
      const responseData = await response.json();
      console.log(responseData)
      if(response.ok === true){

        const result = {
            followersCount:responseData.profile.followers_count,
            followingCount:responseData.profile.following_count,
            id:responseData.profile.id,
            posts:responseData.profile.posts.map((eachItem1)=> ({
                id:eachItem1.id,
                image:eachItem1.image
            }
        )),
        postsCount:responseData.profile.posts_count,
        profilePic:responseData.profile.profile_pic,
        stories:responseData.profile.stories.map((eachItem1) => ({
            id:eachItem1.id,
            image:eachItem1.image
        })),
        userBio:responseData.profile.user_bio,
        userId:responseData.profile.user_id,
        userName:responseData.profile.user_name
        }
        console.log(result)
        this.setState({myprofileDetails:result,loadindStatus:true})
    }else{
        this.setState({myprofileDetails:{}})
    }
      }

      loadingFunction = ()=> 
      <div className="loader-container" testid="loader">
  <Loader type="TailSpin" color="#4094EF"  height={50} width={50} />
</div>

myprofileElements = ()=> {
    const {myprofileDetails} = this.state
    const {followersCount,followingCount,id,posts,postsCount,
        profilePic,stories,userBio,userId,userName} = myprofileDetails


    return <div>
        <div className="container-myprofile">
            <div className="container-1-1">
            <img src={profilePic} alt="my profile" className="profile-image"/>
            <div className="container-bio">
                <h1 className="heading-username">{userName}</h1>
                <div className="descrition-box">
                    <p>{postsCount} posts</p>
                    <p>{followersCount} followers</p>
                    <p>{followingCount} following</p>
                </div>
                <p className="user-id">{userId}</p>
                <p className="user-bio">{userBio}</p>
            </div>
            
            </div>
            <ul className="unorder-my-profile">
                {stories.map((eachItem) => <StoryImage key={eachItem.id} details = {eachItem}/>)}
            </ul>
            <hr className="horizontal"/>
            <div className="posts-grid">
                <BsGrid3X3 />
                <p className="post-heading">Posts</p>
            </div>
            <ul className="unorder-my-profile">
                {posts.map((eachItem) => <StoryImage1 key={eachItem.id} details = {eachItem}/>)}
            </ul>
        </div>
    </div>
}

    render(){

        const {loadindStatus} = this.state

        return <DetailShare.Consumer>
        {value =>{
            const {searchBox} = value
        
            return  <>
            <Header/>
            <div className="container-main-myprofile">
            {searchBox.length > 0 ? (<div><SearchResult searchDetails1={searchBox}/>
</div>): (loadindStatus?this.myprofileElements():this.loadingFunction())}
            </div>
            
        </>
    
        }}
    </DetailShare.Consumer>
        
    }
}

export default MyProfile

