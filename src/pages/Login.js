import Login_Function from "../components/Login_Function";
import "../stylesheets/Login.css";

const Login = (props) => {
    return (
        <div className="BackgroundImage">
            <div className="BackgroundImage-Filter">
                <h1 className="Login">Login</h1>
                <Login_Function setToken={props.setToken}/>
            </div>
        </div>
    );
};

export default Login;
