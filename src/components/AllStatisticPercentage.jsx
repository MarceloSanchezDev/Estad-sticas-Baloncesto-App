import { useEffect, useState } from "react";
import Loader from "../components/loaders/Loader";
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
  const formula = (lanzados, encestados) => {
    if (lanzados === 0) return "0%";
    return ((encestados / lanzados) * 100).toFixed(2);
  };
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
    <div className="container text-center h-100 vh-100">
      <div className="d-flex flex-column align-items-center justify-content-center h-75 ">
        {allPorcentages ? (
          <div
            className="container border rounded-3 border-primary p-3 shadow-lg"
            style={{ maxHeight: "70vh" }}
          >
            <div className="row">
              <div className="col col-xs-12">
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
              <div className="col col-xs-12 d-flex flex-column justify-content-center align-items-center">
                <h2
                  className={
                    formula(
                      allPorcentages[0].total_tiros,
                      allPorcentages[0].total_encestados
                    ) > 50
                      ? "text-center text-success"
                      : "text-center text-warning"
                  }
                >
                  Estadistica de Tiro :{" "}
                  {formula(
                    allPorcentages[0].total_tiros,
                    allPorcentages[0].total_encestados
                  )}
                </h2>
                <p className="text-center text-danger w-100">
                  Total Lanzados : {allPorcentages[0].total_tiros}
                </p>{" "}
                <p className="text-center text-primary w-100">
                  Total Encestados : {allPorcentages[0].total_encestados}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
