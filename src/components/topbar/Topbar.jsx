import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


export default function Topbar() {

    const PF = process.env.REACT_APP_PUBLIC_FORDER;
    const {user} = useContext(AuthContext);
    return (
        <div className= "topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">DaoNho</span>
                </Link>
            </div>
    
            <div className="topbarRight">
                
                
                <Link to={`/profile/${user.username}`}>
                <img src= {user.profilePicture  ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
                <span className="user-name">{user.username}</span>
            </div>
            
        </div>
    )
}
