import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import {useContext, useRef} from "react";
import axios from "axios";

export default function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FORDER;
    const {user} = useContext(AuthContext);

    const input = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost ={
            userId: user._id,
            desc: input.current.value
        };
        input.current.value = "";
        try{
            await axios.post("/posts",newPost);
        }catch(err){
            console.log(err)
        }

    }
    
    return (
        <div className="box-share-post">
            <div className="shareWrapper">
                <div className="shar-top">
                    <img src={user.profilePicture || (PF +"person/noAvatar.png")} alt="" className="shareProfileImg" />
                    <input placeholder={"What's in your mind "+user.username +" ?"} 
                    className="shareInput" 
                    ref={input}
                    />
                </div>
                <hr className="share-hr" />
                <form className="share-post-form" onSubmit={handleSubmit}>
                    
                    <button type="submit" className="submit-post-button">Share</button>
                </form>
            </div>

        </div>
    )
}
