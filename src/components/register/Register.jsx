import "./register.css"
import { useRef } from "react";
import axios from "axios";
import {useHistory} from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef(); 
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e)=>{
        e.preventDefault();
        if( password.current.value !== passwordAgain.current.value){
            password.current.setCustomValidity("Passwords don't match!")
        }else{
                
            const user = {
                email: email.current.value,
                password: password.current.value,
                username: username.current.value
            };
            try{

                await axios.post("auth/register",user);
                history.push("/login")
            }catch(err){
                console.log(err);
            }
            
     
        }
        
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">DaoNho</h3>
                    
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" className="loginInput" ref={username} />
                        <input placeholder="Email" className="loginInput" type="email" ref={email} />
                        <input placeholder="Password" className="loginInput" type="password" ref={password} minLength="6"/>
                        <input placeholder="Password Again" className="loginInput" type="password" ref={passwordAgain} minLength="6"/>
                        <button className="loginButton" type="submit">Sign up</button>
                        <Link to={'/login'}>
                        <button className="loginRegisterButton">
                            Log into Acount
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
