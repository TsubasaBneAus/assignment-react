import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Navigation.css";

const Navigation = (props) => {
    const [list, setList] = useState();
    useEffect(() => {
        if (props.token === null) {
            setList(
                <Fragment>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </Fragment>
            );
        } else {
            setList(
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            );
        }
    }, [props.token]);

    return (
        <div className="Navigation">
            <h1 className="Title">Volcanoes in the World</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/volcano_list">Volcano List</Link>
                    </li>
                    {list}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
