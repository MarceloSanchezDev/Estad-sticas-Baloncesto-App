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
import StatLoader from "../loaders/StatLoader";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AllStatistic() {
  const { token, user } = useAuth();
  const [allStatistics, setAllStatistics] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`/api/statistics/list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();

        if (!result.ok) {
          Swal.fire({
            position: "bottom-end",
            width: 400,
            timer: 1500,
            title: "Error al Cargar las Estadisticas",
            text: data.error || "Ocurrió un error inesperado.",
            icon: "error",
            showConfirmButton: false,
          });
          return;
        }
        Swal.fire({
          position: "bottom-end",
          width: 400,
          timer: 1500,
          title: "¡Éxito al Cargar las Estadisticas!",
          icon: "success",
          showConfirmButton: false,
        });
        setAllStatistics(data.response);
      } catch (error) {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          timer: 1500,
          title: "Error al Cargar las Estadisticas",
          text: error.message || "Ocurrió un error inesperado.",
          icon: "error",
          showConfirmButton: false,
        });
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center aparecer">
      {allStatistics ? (
        <>
          {allStatistics.length > 0 ? (
            <div className="container">
              <div className="row">
                {allStatistics.map((e) => (
                  <div
                    key={e.id_stat}
                    className="col-sm-6 col-xs-12 col-lg-4 my-3 "
                  >
                    <div className="card  border-primary border rounded-3 shadow-lg">
                      <div className="card-header">
                        <h5 className="card-title">{e.nombreEstadistica}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {` Fecha :${e.fecha} Hora :${e.hora}`}
                        </h6>
                      </div>
                      <div className="card-body" role="article">
                        <Doughnut
                          key={e.id_stat}
                          data={{
                            labels: ["Encestados", "Fallados"],
                            datasets: [
                              {
                                label: "Distribución de Lanzamientos",
                                data: [
                                  e.cantLibresEncestados +
                                    e.cant_tresPuntosEncestados +
                                    e.cant_dosPuntosEncestados,

                                  e.cant_tresPuntos +
                                    e.cant_dosPuntos +
                                    e.cantLibres -
                                    (e.cantLibresEncestados +
                                      e.cant_tresPuntosEncestados +
                                      e.cant_dosPuntosEncestados),
                                ],
                                backgroundColor: ["#36A2EB", "#FF6384"],
                              },
                            ],
                          }}
                        />
                      </div>
                      <ul className="list-group list-group-flush rounded">
                        <li className="list-group-item text-bg-info">
                          Porcentaje Lanzamientos de 3 puntos :{" "}
                          {e.estadisticasTresPuntos}
                        </li>
                        <li className="list-group-item text-bg-info">
                          Porcentaje de 2 puntos : {e.estadisticasDosPuntos}
                        </li>

                        <li className="list-group-item text-bg-info">
                          Porcentaje de tiro Libre : {e.estadisticasLibres}
                        </li>
                      </ul>
                      <div className="p-2">
                        <Link
                          to={`/infoStat?StatID=${e.id_stat}`}
                          className="btn btn-success"
                        >
                          Ver Estadistica
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="row">
              <h1 className="text-white">Aun no tienes Ninguna Estadistica</h1>
            </div>
          )}
        </>
      ) : (
        <div className="container vh-100 d-flex d-flex align-items-center justify-content-center">
          <div className="row d-flex align-items-center justify-content-center py-3 px-3">
            <StatLoader />
            <StatLoader />
            <StatLoader />
            <StatLoader />
            <StatLoader />
            <StatLoader />
          </div>
        </div>
      )}
    </div>
  );
}
