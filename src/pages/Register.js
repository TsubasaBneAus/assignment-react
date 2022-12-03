import Register_Function from "../components/Register_Function";
import "../stylesheets/Register.css";

const Register = (props) => {
    return (
        <div className="BackgroundImage">
            <div className="BackgroundImage-Filter">
                <h1 className="Register">Register</h1>
                <Register_Function setToken={props.setToken}/>
            </div>
        </div>
    );
};

export default Register;
