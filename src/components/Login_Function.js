import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Login_Function.css";

const API_URL = "http://sefdb02.qut.edu.au:3001";

const Login_Function = (props) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [errorPassword, setErrorPassword] = useState(
        "Please input your password."
    );
    const [errorEmail, setErrorEmail] = useState("Please input your email");
    const navigate = useNavigate();

    const login = () => {
        const url = `${API_URL}/user/login`;
        fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((res) => res.json())
            .then((js_object) => {
                if (js_object.error === true) {
                    setLoginMessage(js_object.message + "!!");
                } else {
                    localStorage.setItem("token", js_object.token);
                    navigate("/");
                    props.setToken(js_object.token);
                }
            });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <div className="Login_Email">
                <label className="Login_Function" htmlFor="name">
                    Your email:
                </label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(event) => {
                        const inputEmail = event.target.value;
                        if (inputEmail === "") {
                            setErrorEmail("Please input your email.");
                        } else {
                            setErrorEmail(null);
                        }
                        setEmail(inputEmail);
                    }}
                />
            </div>
            <div className="Login_Password">
                <label className="Login_Function" htmlFor="name">
                    Your password:
                </label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    value={password}
                    onChange={(event) => {
                        const inputPassword = event.target.value;
                        if (inputPassword === "") {
                            setErrorPassword("Please input your password.");
                        } else {
                            setErrorPassword(null);
                        }
                        setPassword(inputPassword);
                    }}
                />
            </div>
            <button
                className="Login_Button"
                onClick={login}
                disabled={errorPassword !== null || errorEmail !== null}
            >
                Login
            </button>
            <div className="LoginErrorMessage">
                {loginMessage !== null ? (
                    <p className="Login_Input">{loginMessage}</p>
                ) : null}
                {errorPassword !== null ? (
                    <p className="Login_Input">{errorPassword}</p>
                ) : null}
                {errorEmail !== null ? (
                    <p className="Login_Input">{errorEmail}</p>
                ) : null}
            </div>
        </form>
    );
};

export default Login_Function;
