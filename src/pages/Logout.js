import { useNavigate } from "react-router-dom";
import "../stylesheets/Logout.css";

const Logout = (props) => {
    const navigate = useNavigate();
    localStorage.removeItem("token");

    setTimeout(() => {
        navigate("/");
        props.setToken(null);
    }, 2000);

    return (
        <div className="BackgroundImage">
            <div className="BackgroundImage-Filter">
                <h1 className="Logout">
                    You have been successfully logged out!! Going back to the homepage...
                </h1>
            </div>
        </div>
    );
};

export default Logout;