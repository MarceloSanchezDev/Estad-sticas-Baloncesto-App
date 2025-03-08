import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { all } from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export default function AllStatisticPercentage({ token, user }) {
  const [allPorcentages, setAllPorcentages] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`/api/statistics/allPorcentage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();
        setAllPorcentages(data.response);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center h-100 p-3 mt-5">
      <h1>Porcentaje Total</h1>
      {allPorcentages ? (
        <div className="container" style={{ maxHeight: "70vh" }}>
          <div className="row">
            <div className="col">
              <Doughnut
                data={{
                  labels: ["Encestados", "Lanzados"],
                  datasets: [
                    {
                      label: "Distribución de Lanzamientos",
                      data: [
                        allPorcentages[0].total_encestados,
                        allPorcentages[0].total_tiros,
                      ],
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                      ],
                    },
                  ],
                }}
              />
            </div>

            <div className="col aling-items-center">
              <p className="text-center text-muted">
                Lanzados : {allPorcentages[0].total_encestados}
              </p>
              <p className="text-center text-muted">
                Encestados : {allPorcentages[0].total_tiros}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center">
          <div className="card col-sm-6 col-xs-16 col-lg-16 my-3 w-100">
            <div className="card-header">
              <h5 className="card-title placeholder-glow ">
                <span className="placeholder col-6"></span>
              </h5>
              <h6 className="card-subtitle placeholder-glow mb-2 text-body-secondary">
                <span className="placeholder col-6"></span>
              </h6>
            </div>
            <div className="card-body placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </div>
            <div className="p-2 placeholder-glow">
              <Link
                to={"/"}
                className="btn btn-success disabled placeholder col-6"
                aria-disabled="true"
              ></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
