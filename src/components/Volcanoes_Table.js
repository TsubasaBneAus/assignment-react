import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../stylesheets/Volcanoes_Table.css";

const API_URL = "http://sefdb02.qut.edu.au:3001";
const token = localStorage.getItem("token");

const Volcanoes_Table = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Algeria");
    const [volcanoData1, setVolcanoData1] = useState([]);
    const [volcanoPopulationArea, setVolcanoPopulationArea] = useState("None");
    const navigate = useNavigate();
    const columns = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Region", field: "region", sortable: true, filter: true },
        { headerName: "Subregion", field: "subregion", sortable: true, filter: true },
    ];

    useEffect(() => {
        const urlGetCountriesData = `${API_URL}/countries`;
        fetch(urlGetCountriesData, {
            method: "GET",
            headers:
                token !== null
                    ? {
                          accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                      }
                    : {},
        })
            .then((res) => res.json())
            .then((js_object) => setCountries(js_object));
    }, []);

    useEffect(() => {
        let urlGetVolcanoesData = "";
        switch (volcanoPopulationArea) {
            case "None":
                urlGetVolcanoesData = `${API_URL}/volcanoes?country=${selectedCountry}`;
                break;

            case "5km":
            case "10km":
            case "30km":
            case "100km":
                urlGetVolcanoesData = `${API_URL}/volcanoes?country=${selectedCountry}&populatedWithin=${volcanoPopulationArea}`;
                break;
        }

        fetch(urlGetVolcanoesData, {
            method: "GET",
            headers:
                token !== null
                    ? {
                          accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                      }
                    : {},
        })
            .then((res) => res.json())
            .then((js_object) =>
                js_object.map((each) => {
                    return {
                        id: each.id,
                        name: each.name,
                        country: each.country,
                        region: each.region,
                        subregion: each.subregion,
                    };
                })
            )
            .then((data) => setVolcanoData1(data));
    }, [selectedCountry, volcanoPopulationArea]);


    return (
        <div>
            <p className="Num_Volcanoes">
                {`${volcanoData1.length} Volcanoes in ${selectedCountry}`}
            </p>
            <div className="Select_Country">
                <p className="Search_Columns">Country:</p>
                <select
                    className="Selection_Box"
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                >
                    {countries.map((country) => (
                        <option value={country}>{country}</option>
                    ))}
                </select>
                <p className="Search_Columns">Populated within:</p>
                <select
                    className="Selection_Box"
                    value={volcanoPopulationArea}
                    onChange={(event) =>
                        setVolcanoPopulationArea(event.target.value)
                    }
                >
                    <option value={"None"}>None</option>
                    <option value={"5km"}>5km</option>
                    <option value={"10km"}>10km</option>
                    <option value={"30km"}>30km</option>
                    <option value={"100km"}>100km</option>
                </select>
            </div>
            <div className="ag-theme-balham">
                <AgGridReact
                    className="Table"
                    columnDefs={columns}
                    rowData={volcanoData1}
                    pagination
                    paginationPageSize={10}
                    onRowClicked={(row) =>
                        navigate(
                            `details?id=${row.data.id}&name=${row.data.name}`
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Volcanoes_Table;
