import { Pie } from "react-chartjs-2";
import Loader from "../components/loaders/Loader";
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
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export default function StatInit({ titulo, info }) {
  return (
    <>
      {info ? (
        <div className="col-md-4 col-sm-12 h-100 d-flex align-items-center justify-content-center">
          <div className="row d-flex flex-column align-items-center justify-content-center w-100 h-100 p-2">
            <h2>{titulo}</h2>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow"
              style={{ height: "40%" }}
            >
              <Pie
                key={1}
                data={{
                  labels: ["Encestados", "Fallados"],
                  datasets: [
                    {
                      label: "Distribución de Lanzamientos",
                      data: [22, 25],
                      backgroundColor: ["#36A2EB", "#FF6384"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: false }}
              />
            </div>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow"
              style={{ height: "40%" }}
            >
              <Pie
                key={2}
                data={{
                  labels: ["Encestados", "Fallados"],
                  datasets: [
                    {
                      label: "Distribución de Lanzamientos",
                      data: [22, 25],
                      backgroundColor: ["#36A2EB", "#FF6384"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-4 col-sm-12 h-100 d-flex align-items-center justify-content-center">
          <div className="row d-flex flex-column align-items-center justify-content-center w-100 h-100 p-2">
            <h2>{titulo}</h2>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow d-flex align-items-center"
              style={{ height: "40%" }}
            >
              <Loader />
            </div>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow d-flex align-items-center"
              style={{ height: "40%" }}
            >
              <Loader />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
