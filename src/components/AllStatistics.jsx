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
  const [allStatistics, setAllStatistics] = useState([
    {
      id_stat: "03eb5326-3f99-4c88-8702-506e77cd774d",
      fecha: "2025-03-07",
      estadisticasDosPuntos: "100.00%",
      estadisticasTresPuntos: "100.00%",
      user_username: "elmarrce",
      nombreEstadistica: "Marcelo",
      cant_dosPuntos: 12,
      cant_tresPuntos: 12,
      cant_dosPuntosEncestados: 12,
      cant_tresPuntosEncestados: 12,
      hora: "18:17:10",
      estadisticasLibres: "100.00%",
      cantLibres: 12,
      cantLibresEncestados: 12,
    },
    {
      id_stat: "2600dcde-23f1-4f47-ba4b-ec9053074b5c",
      fecha: "2025-03-08",
      estadisticasDosPuntos: "41.67%",
      estadisticasTresPuntos: "41.67%",
      user_username: "elmarrce",
      nombreEstadistica: "Ultima Estadistica Xd",
      cant_dosPuntos: 12,
      cant_tresPuntos: 12,
      cant_dosPuntosEncestados: 5,
      cant_tresPuntosEncestados: 5,
      hora: "02:30:03",
      estadisticasLibres: "83.33%",
      cantLibres: 12,
      cantLibresEncestados: 10,
    },
  ]);
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
    <div className="container text-center p-3 mt-5">
      <h1>Todas Las Estadisticas</h1>
      {allStatistics ? (
        <div className="container bg-light border-primary border rounded-3">
          <div className="row">
            {allStatistics.map((e) => (
              <div key={e.id_stat} className="col-sm-6 col-xs-16 col-lg-4 my-3">
                <div className="card  ">
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
        <div className="container bg-light border-primary border rounded-3">
          <div className="row">
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
            <div className="card col-sm-6 col-xs-16 col-lg-4 my-3 ">
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
              </div>
              <ul className="list-group list-group-flush rounded placeholder-glow">
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
                <li className="list-group-item text-bg-info placeholder"></li>
              </ul>
              <div className="p-2 placeholder-glow">
                <Link
                  to={"/"}
                  className="btn btn-success disabled placeholder col-6"
                  aria-disabled="true"
                ></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
