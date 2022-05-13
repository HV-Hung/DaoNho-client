import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Feed({username}) {
    const [posts,setPosts] = useState([]); 
    const {user} = useContext(AuthContext);

    useEffect(() => {
       const fetchPosts = async ()=>{
        const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" +user._id);
        const newPost = [...res.data];
        newPost.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPosts(newPost);
       }
       fetchPosts();
    },[]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
               { posts.map((m) =>(
               <Post
                 post ={m}
                 key = {m._id}
                 />
               ))}
            </div>
        </div>
    )
}
