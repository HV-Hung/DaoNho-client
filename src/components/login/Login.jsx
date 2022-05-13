import "./login.css";
import { useRef, useContext } from "react";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from  "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleClick = (e)=>{
        e.preventDefault();
        LoginCall({email: email.current.value, password: password.current.value}, dispatch );
        console.log( isFetching);
    };

   
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">DaoNho</h3>
                </div>
                <div className="loginRight">
                    <form  className="loginBox"onSubmit={handleClick}>
                        <input type="email" 
                        placeholder="Email" 
                        required
                        className="loginInput" 
                        ref={email}
                        />
                        <input type="password" 
                        placeholder="Password" 
                        required
                        minLength="6"
                        className="loginInput" 
                        ref={password}
                        />
                        <button className="loginButton" disabled={isFetching}>{isFetching? <CircularProgress size="20px"  /> : "Login" }</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to={'/register'}>
                        <button className="loginRegisterButton" >
                            Create a New Acount
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
