import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


export default function Sidebar() {
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState({});
    useEffect(() => {
        const fetchUsers = async ()=>{
         const res = await axios.get(`/users/all/${user._id}`);
         
         const { data} = res;
         setUsers(data )
        }
        fetchUsers();
     },[]);
    
    return (
        <div className="sidebar">
            <div className="sidebarwrapper">
                <h3>Others people</h3>
                <hr className="sidebarHr"></hr>
                <ul className="sidebarFriendList">
                   {Object.values(users).map(user=><CloseFriend user = {user}></CloseFriend>) }
                </ul>
            </div>
        </div>
    )
}
