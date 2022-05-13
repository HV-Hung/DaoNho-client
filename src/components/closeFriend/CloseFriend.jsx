import "./closeFriend.css"
import { Link } from "react-router-dom";
export default function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FORDER;
    return (
    <li className="sidebarFriend">
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture  || PF + "person/noAvatar.png"} alt="" className="sidebarFriendImg" />
        </Link>
        <span className="sidebarFriendName">{user.username}</span>
        
    </li>                      
   )
}
