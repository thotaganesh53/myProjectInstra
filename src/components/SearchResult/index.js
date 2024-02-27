
import Header from "../Header"
import { Component } from "react";

import Cookies from "js-cookie";

import Loader from 'react-loader-spinner';

import { Link } from "react-router-dom";


import Slider from "react-slick";


import {BsHeart } from 'react-icons/bs';
import {BiShareAlt} from 'react-icons/bi';
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import  DetailShare from '../ReactContextComp'



import './index.css';

  
  
const CommentDetails = (props)=> {
  const {details} = props
  const {userName,comment} = details
  
  return <li className="container-likes-count-1">
    <p className="comment-names">{userName} </p>
    <p>{comment}</p>
  </li>
}

  const PostElements = (props)=> {
    const {details, changeHeart,changeRedHeart,changeRedButton1,increaseCount,idRed,responseLike1} = props

    const {profilePic,userName,postDetails,likesCount,comments,createdAt,postId,userId} = details
    const {caption,imageUrl} = postDetails

    let  likePostViewer = parseInt(likesCount);

    
      likePostViewer = responseLike1 === 'Post has been liked' ? (parseInt(likesCount)-1): parseInt(likesCount)
            likePostViewer = responseLike1 === 'Post has been disliked' ? (parseInt(likesCount)+1):parseInt(likesCount)
    
    const changeRed = async() => {
      
      const jwtToken = Cookies.get('jwt_token')

      const requestLike = {"like_status": changeRedButton1}

      const options = {
        method:"POST",
        headers:{
          Authorization:`Bearer ${jwtToken}`,
      },
      body:JSON.stringify(requestLike)
      }
      const response = await fetch(`https://apis.ccbp.in/insta-share/posts/${postId}/like`,options)
      const responseData = await response.json()
      console.log(responseData)
      const responseMessage = responseData.message;


       changeRedHeart(postId,responseMessage)
    }

    return <li className="container-post-details">
      <div className="container-box-1">
        <img src={profilePic} alt="post author profile" className="image-profilePic"/>
        <Link to ={`/users/${userId}`} className="post-id-url"><p className="heading-username">{userName}</p></Link>
      </div>
      <img src={imageUrl} alt="post" className="post-picture"/>
      <div className="container-main-details">
      <div className="container-comments">
        <button testid="likeIcon" className="button-icons" onClick={changeRed}>{(changeRedButton1) ? <FcLike/>: <BsHeart/>}</button>
        <button testid="unLikeIcon" className="button-icons"><FaRegComment/></button>
        <button className="button-icons"><BiShareAlt/></button>
      </div>
      <div className="container-likes-count">
      <p className="likescount-1">{likePostViewer} likes</p>
      <p>{caption}</p>
      <ul className="unorder-box-comments">
        {comments.map((eachItem) => (<CommentDetails key={eachItem.userId} details={eachItem}/>))}
      </ul>
      <p className="createdAt-1">{createdAt}</p>
      </div>
      </div>
    </li>
    

  }
  

class SearchResult extends Component{

  state={userProfileDetails:[],postsDetails:[],userProfileStory:false,postLoading:false,changeRedButton:false,increaseCount:false,
    tryAgainOnce:false,idRed:'',responseLike1:''}

    

    

    getSearchPost = async (searchBox) => {
      const jwtToken = Cookies.get('jwt_token');
      console.log(jwtToken)

      
      const {searchDetails1} = this.props

      const options = {
          
          headers:{
              Authorization:`Bearer ${jwtToken}`,
          },
          method:"GET"
      }

      const response = await fetch(`https://apis.ccbp.in/insta-share/posts?search=${searchBox}`,options);
      const responseData = await response.json()
      console.log(responseData);

      if(response.ok === true){
        const result = responseData.posts.map((eachItem)=> ({
          profilePic:eachItem.profile_pic,
          userId:eachItem.user_id,
          userName:eachItem.user_name,
          postId:eachItem.post_id,
          likesCount:eachItem.likes_count,
          createdAt:eachItem.created_at,
          comments:eachItem.comments.map((eachItem1) => ({comment:eachItem1.comment,
            userId:eachItem1.user_id,
            userName:eachItem1.user_name
          })),
          postDetails:{caption:eachItem.post_details.caption,
            imageUrl:eachItem.post_details.image_url
          }
        }))
        console.log(result)
        this.setState({postsDetails:result,postLoading:true})
      }else{
        this.setState({somethingWrong:true})
      }

      
      
  }

  somethingWentWrong = ()=> <div className="container-somrething">
    <img src="/images/Group 7522.png" alt="image" className="image-something"/>
    <p className="description-something">Something went wrong. Please try again</p>
    <button className="button-something" onClick={this.getSearchPost}>Try again</button>
  </div>

  changeRedHeart = (id,messageLike)=> {
    const {postsDetails} = this.state
    const filterPost = postsDetails.filter((eachItem) => (eachItem.postId === id))
    const mapPost = filterPost[0].postId
    
    if(mapPost === id){
      console.log('jj')
      this.setState((prev) => ({changeRedButton:!prev.changeRedButton,idRed:id,responseLike1:messageLike}))
    }
   
  }

  noSearchResult = ()=> <div className="search-no-container-1">
    <img src="/images/Group.png" alt="search not found" className="image-no-search" />
    <h1 className="heading-no-search">Search Not Found</h1>
    <p className="description-no-search">Try different keyword or search again</p>
  </div>

      loadingFunction = ()=> 
      <div className="loader-container" testid="loader">
  <Loader type="TailSpin" color="#4094EF"  height={50} width={50} />
</div>

    render(){
      const {userProfileStory,somethingWrong,postsDetails,postLoading,changeRedButton,idRed,responseLike1} = this.state
      
      return <DetailShare.Consumer>
      {value=> {
        const {searchBox} = value

        this.getSearchPost(searchBox)
    
        return <div>
                <div className="container-home-1">
                <div>

                {(searchBox.length > 0) && somethingWrong ? (this.somethingWentWrong()): (<>
                  {postsDetails.length > 0 && <h1 className="search-result-heading">Search Results</h1>} 
                  {postLoading ? (<ul className="post-container">
                    
                  {postsDetails.length !== 0 ?(postsDetails.map((eachItem) => (<PostElements details = {eachItem} key={eachItem.postId} changeRedHeart={this.changeRedHeart} 
          changeRedButton1={eachItem.postId === idRed && changeRedButton ? true : false} increaseidRed={idRed} responseLike1={responseLike1}/>))):(this.noSearchResult())}
                  </ul>) : (this.loadingFunction())}
                </>)}
                
                
                
                </div>
                </div>
            </div> 
        
      }}
    </DetailShare.Consumer>
        
    }
}

export default SearchResult;


