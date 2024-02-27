import Header from "../Header"
import { Component } from "react";

import Cookies from "js-cookie";

import Loader from 'react-loader-spinner';


import { BsGrid3X3 } from "react-icons/bs";
import { BiCamera } from "react-icons/bi";


import './index.css';


const StoryImage = (props) => {
    const {details} = props;
    const {image} = details

    return <li>
        <img src={image} alt="user story" className="user-image-story"/>
    </li>
}

const StoryImage1 = (props) => {
    const {details} = props;
    const {image} = details

    return <li>
        <img src={image} alt="user post" className="user-image-story-1"/>
    </li>
}

class UserProfileDetails extends Component{

    state ={myprofileDetails:{},loadindStatus:false,}

    componentDidMount(){
        this.getMyProfileDetails()
    }

    getMyProfileDetails = async()=> {
        const jwtToken = Cookies.get('jwt_token');
        const {match} = this.props
        const {params} =match
        const {id} = params
        console.log(id)
      
      const options = {
          
          headers:{
              Authorization:`Bearer ${jwtToken}`,
          },
          method:"GET"
      }
      const response = await fetch(`https://apis.ccbp.in/insta-share/users/${id}`,options)
      const responseData = await response.json();
      console.log(responseData)
      if(response.ok === true){

        const result = {
            followersCount:responseData.user_details.followers_count,
            followingCount:responseData.user_details.following_count,
            id:responseData.user_details.id,
            posts:responseData.user_details.posts.map((eachItem1)=> ({
                id:eachItem1.id,
                image:eachItem1.image
            }
        )),
        postsCount:responseData.user_details.posts_count,
        profilePic:responseData.user_details.profile_pic,
        stories:responseData.user_details.stories.map((eachItem1) => ({
            id:eachItem1.id,
            image:eachItem1.image
        })),
        userBio:responseData.user_details.user_bio,
        userId:responseData.user_details.user_id,
        userName:responseData.user_details.user_name
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

noPostDisplay = ()=> {
    return <div>
        <BiCamera />
        <p className="user-no-post-1">No Posts Yet</p>

    </div>
}

myprofileElements = ()=> {
    const {myprofileDetails} = this.state
    const {followersCount,followingCount,id,posts,postsCount,
        profilePic,stories,userBio,userId,userName} = myprofileDetails


    return <div>
        <div className="user-container-myprofile">
            <div className="user-container-1-1">
            <img src={profilePic} alt="user profile" className="user-profile-image"/>
            <div className="user-container-bio">
                <h1 className="user-heading-username">{userName}</h1>
                <div className="user-descrition-box">
                    <p className="user-p1">{postsCount} posts</p>
                    <p className="user-p1">{followersCount} followers</p>
                    <p className="user-p1">{followingCount} following</p>
                </div>
                <div className="container-of-bio-details">
                <p className="user-user-id">{userId}</p>
                <p className="user-user-bio">{userBio}</p>
                </div>
            </div>
            
            </div>
            <ul className="user-unorder-my-profile">
                {stories.map((eachItem) => <StoryImage key={eachItem.id} details = {eachItem}/>)}
            </ul>
            <hr className="user-horizontal"/>
            <div className="user-posts-grid">
                <BsGrid3X3 />
                <p className="user-post-heading">Posts</p>
            </div>
            {postsCount > 0 ? (<ul className="user-unorder-my-profile">
                {posts.map((eachItem) => <StoryImage1 key={eachItem.id} details = {eachItem}/>)}
            </ul>):(this.noPostDisplay())}
            
        </div>
    </div>
}

    render(){

        const {loadindStatus} = this.state

        return <>
            <Header/>
            <div className="container-main-myprofile">
            {loadindStatus?this.myprofileElements():this.loadingFunction()}
            </div>
            
        </>
    }
}

export default UserProfileDetails