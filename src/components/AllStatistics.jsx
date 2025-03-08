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
  const [allStatistics, setAllStatistics] = useState(null);
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
        console.log(result);
        const data = await result.json();
        console.log(data);
        setAllStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  const formula = (lanzados, encestados) => {
    if (lanzados === 0) return "0%";
    return ((encestados / lanzados) * 100).toFixed(2) + "%";
  };
  return (
    <div className="container text-center p-3 mt-5">
      <h1>Todas Las Estadisticas</h1>
      {Array.isArray(allStatistics) && allStatistics.length > 0 ? (
        <div className="container bg-light border-primary border rounded-3">
          <div className="row">
            {allStatistics.map((e) => (
              <div key={e.id} className="col-sm-6 col-xs-16 col-lg-4 my-3">
                <div className="card  ">
                  <div className="card-header">
                    <h5 className="card-title">{e.titulo}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {` Fecha :${e.fecha} Hora :${e.hora}`}
                    </h6>
                  </div>
                  <div className="card-body">
                    <Doughnut
                      key={e.id}
                      data={{
                        labels: ["Encestados", "Fallados"],
                        datasets: [
                          {
                            label: "Distribución de Lanzamientos",
                            data: [
                              e.libresEncestados +
                                e.encestados3 +
                                e.encestados2,
                              e.lanzamientos3 +
                                e.lanzamientos2 +
                                e.libresLanzados -
                                (e.libresEncestados +
                                  e.encestados3 +
                                  e.encestados2),
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
                      {formula(e.lanzamientos3, e.encestados3)}
                    </li>
                    <li className="list-group-item text-bg-info">
                      Porcentaje de 2 puntos :{" "}
                      {formula(e.lanzamientos2, e.encestados2)}
                    </li>

                    <li className="list-group-item text-bg-info">
                      Porcentaje de tiro Libre :{" "}
                      {formula(e.libresLanzados, e.libresEncestados)}
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
