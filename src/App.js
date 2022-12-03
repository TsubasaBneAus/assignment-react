import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Volcano_List from "./pages/Volcano_List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Not_Found from "./pages/Not_Found";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    return (
        <BrowserRouter>
            <Navigation token={token} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/volcano_list/*" element={<Volcano_List />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route
                    path="/register"
                    element={<Register setToken={setToken} />}
                />
                <Route
                    path="/logout"
                    element={<Logout setToken={setToken} />}
                />
                <Route path="*" element={<Not_Found />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
