import { Routes, Route } from "react-router-dom";
import Volcanoes_Table from "../components/Volcanoes_Table";
import Details from "../components/Details";
import "../stylesheets/Volcano_List.css";

const Volcano_List = () => {
    return (
        <div className="BackgroundImage">
            <div className="BackgroundImage-Filter">
                <h1 className="Volcano_List">Volcano List</h1>
                <Routes>
                    <Route path="/details" element={<Details />} />
                    <Route path="/" element={<Volcanoes_Table />} />
                </Routes>
            </div>
        </div>
    );
};

export default Volcano_List;
