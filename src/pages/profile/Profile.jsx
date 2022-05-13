import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";  
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";



export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FORDER;
    const [currentUser, setCurrentUser] = useState({});
    const username = useParams().username;
    const {user} = useContext(AuthContext);
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        const fetchUser = async ()=>{
        const res = await axios.get(`/users?username=${username}`);
        setCurrentUser(res.data);
        setIsFollow(user.followings.includes(res.data._id));
        }
        fetchUser();
        
     },[]);
    const handldFolow = async()=>{
        if(isFollow){
            try{
                axios.put("/users/"+ user._id +"/unfollow", {userId: currentUser._id})
            }catch(err){
                console.log(err);
                
            } 
        }else{
            try{
                axios.put("/users/"+ user._id +"/follow", {userId: currentUser._id})
            }catch(err){
                console.log(err);
                
            }  
        }
         
        setIsFollow(!isFollow);
    }

    return (
        <>
            <Topbar/>
            
            <div className="profile">
            
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                        <img src={currentUser.coverPicture  || PF + "person/noCover.png"}
                         alt="" 
                         className="profileCoverImg" 
                        />  
                        <img src={currentUser.profilePicture  || PF + "person/noAvatar.png"}
                         alt=""
                        className="profileUserImg" 
                        />
                        
                        </div>
                        
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{currentUser.username}</h4>
                            <span className="profileInfoDesc">{currentUser.desc} </span>
                            <button onClick={handldFolow} className={user.username !== username?"follow": "hiden"}>{isFollow?"Unfollow":"Follow"}</button>
                        </div>


                    </div> 
                    <div className="profileBottom">
                    <Feed username={username}/>
                    
                    </div>

                
                </div>
                
                
            </div>
            

        </>
    )
}
