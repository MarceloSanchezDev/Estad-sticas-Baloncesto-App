import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
        console.log(data.response);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center h-100 p-3 mt-5">
      <h1>Porcentaje Total</h1>
      {allPorcentages && (
        <Doughnut
          data={{
            labels: ["Encestados", "Fallados"],
            datasets: [
              {
                label: "Distribución de Lanzamientos",
                data: [
                  allPorcentages.total_encestados,
                  allPorcentages.total_tiros,
                ],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
              },
            ],
          }}
        />
      )}
    </div>
  );
}
