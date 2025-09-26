import { Pie } from "react-chartjs-2";
import Loader from "../loaders/Loader";
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
            <h1>{titulo}</h1>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "250px" }}
            >
              <h3>Lanzamientos Encestados : </h3>
              {info[0] ? (
                <p className="fs-1">{info[0]}</p>
              ) : (
                <p className="fs-1">0</p>
              )}
            </div>
            <div
              className="col-12 border my-1 rounded-3 border-primary shadow d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "250px" }}
            >
              <h3>Lanzamientos Totales : </h3>
              {info[1] ? (
                <p className="fs-1">{info[1]}</p>
              ) : (
                <p className="fs-1">0</p>
              )}
            </div>
            {info[0] && info[1] && (
              <div
                className="col-12 border my-1 rounded-3 border-primary shadow"
                style={{ minHeight: "250px" }}
              >
                <Pie
                  key={2}
                  data={{
                    labels: ["Encestados", "Fallados"],
                    datasets: [
                      {
                        label: "Distribución de Lanzamientos",
                        data: [info[0], info[1]],
                        backgroundColor: ["#36A2EB", "#FF6384"],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            )}
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
