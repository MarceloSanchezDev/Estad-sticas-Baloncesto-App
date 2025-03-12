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
import StatLoader from "./loaders/StatLoader";

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
        const result = await fetch(`/api/statistics/allStatistics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();
        setAllStatistics(data.response);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center mt-5 aparecer">
      <h1>Todas Las Estadisticas</h1>
      {allStatistics ? (
        <div className="container">
          <div className="row">
            {allStatistics.map((e) => (
              <div key={e.id_stat} className="col-sm-6 col-xs-12 col-lg-4 my-3">
                <div className="card  border-primary border rounded-3">
                  <div className="card-header">
                    <h5 className="card-title">{e.nombreEstadistica}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {` Fecha :${e.fecha} Hora :${e.hora}`}
                    </h6>
                  </div>
                  <div className="card-body">
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
                    <Link to={"/"} className="btn btn-success">
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
          <StatLoader />
          <StatLoader />
          <StatLoader />
          <StatLoader />
          <StatLoader />
          <StatLoader />
        </div>
      )}
    </div>
  );
}
