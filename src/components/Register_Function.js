import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Register_Function.css";

const API_URL = "http://sefdb02.qut.edu.au:3001";

const Register_Function = (props) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [errorPassword, setErrorPassword] = useState(
        "Please input your password."
    );
    const [errorEmail, setErrorEmail] = useState("Please input your email");
    const navigate = useNavigate();

    const register = () => {
        const url = `${API_URL}/user/register`;
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
                if (js_object.message !== "User created") {
                    setRegisterMessage(js_object.message + "!!");
                } else {
                    setRegisterMessage(js_object.message + "!!");
                    const url = `${API_URL}/user/login`;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    })
                        .then((res) => res.json())
                        .then((js_object) => {
                            localStorage.setItem("token", js_object.token);
                            setTimeout(() => {
                                navigate("/");
                                props.setToken(js_object.token);
                            }, 2000);
                        });
                }
            });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <div className="Register_Email">
                <label className="Register_Function" htmlFor="name">
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
            <div className="Register_Password">
                <label className="Register_Function" htmlFor="name">
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
                className="Register_Button"
                onClick={register}
                disabled={errorPassword !== null || errorEmail !== null}
            >
                Register
            </button>
            <div className="RegisterErrorMessage">
                {registerMessage !== null ? (
                    <p className="Register_Input">{registerMessage}</p>
                ) : null}
                {errorPassword !== null ? (
                    <p className="Register_Input">{errorPassword}</p>
                ) : null}
                {errorEmail !== null ? (
                    <p className="Register_Input">{errorEmail}</p>
                ) : null}
            </div>
        </form>
    );
};

export default Register_Function;
