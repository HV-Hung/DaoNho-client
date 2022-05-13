import { MoreVert } from "@material-ui/icons"
import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FORDER;
    const {user: currentUser} = useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async ()=>{
         const res = await axios.get(`/users?userId=${post.userId}`);
         setUser(res.data);
        }
        fetchUser();
     },[post.userId]);

    const likeHandler =()=>{
        try{
            axios.put("/posts/"+ post._id+"/like", {userId: currentUser._id})
           
        }catch(err){
            console.log(err)
        }  
        setLike(isLiked? like -1 : like + 1);
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture || (PF +"person/noAvatar.png")}  
                        alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                    <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img  className="postImg" src={post.img } alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={PF +"like.png"} onClick={likeHandler} alt="" className="likeIcon" />
        
                        <span className="postLikeCounter">{like}</span>

                    </div>
                   
                </div>

            </div>
        </div>
    )
}
