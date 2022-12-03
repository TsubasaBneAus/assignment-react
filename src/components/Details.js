import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../stylesheets/Details.css";

const API_URL = "http://sefdb02.qut.edu.au:3001";

const Details = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [volcanoData, setVolcanoData] = useState([]);
    const [coordinate, setCoordinate] = useState([0.0, 0.0]);
    const [population, setPopulation] = useState([]);

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

    const chartData = {
        labels: ["5km", "10km", "30km", "100km"],
        datasets: [
            {
                label: "Population Density",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: population,
            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Population Density",
            },
        },
    };

    useEffect(() => {
        const urlGetVolcanoData = `${API_URL}/volcano/${id}`;

        fetch(urlGetVolcanoData, {
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
            .then((js_object) => {
                setVolcanoData(js_object);
                setCoordinate([
                    parseFloat(js_object.latitude),
                    parseFloat(js_object.longitude),
                ]);
                setPopulation([
                    js_object.population_5km,
                    js_object.population_10km,
                    js_object.population_30km,
                    js_object.population_100km,
                ]);
            });
    }, []);

    return (
        <div>
            <div className="Details">
                <div className="Description">
                    <h1 className="Name">{name}</h1>
                    <p>Country: {volcanoData.country}</p>
                    <p>Region: {volcanoData.region}</p>
                    <p>Subregion: {volcanoData.subregion}</p>
                    <p>Last Eruption: {volcanoData.last_eruption}</p>
                    <p>Summit: {volcanoData.summit}m</p>
                    <p>Elevation: {volcanoData.elevation}ft</p>
                    <button
                        className="Button"
                        onClick={() => navigate("/volcano_list")}
                    >
                        Back
                    </button>
                </div>
                <Map width={700} height={300} center={coordinate}>
                    <Marker width={50} anchor={coordinate} />
                    <ZoomControl />
                </Map>
            </div>
            {token !== null ? (
                <div className="BarDiv">
                    <Bar
                        className="Bar"
                        type="bar"
                        data={chartData}
                        options={options}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default Details;
