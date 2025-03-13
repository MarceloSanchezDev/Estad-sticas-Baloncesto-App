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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const formula = (lanzados, encestados) => {
  if (lanzados === 0) return "0%";
  return ((encestados / lanzados) * 100).toFixed(2) + "%";
};
export default function InfoStat({ token, user }) {
  const [info, setInfo] = useState();
  let query = new URLSearchParams(window.location.search);
  let statID = query.get("StatID");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    const fetchStatInfo = async () => {
      try {
        const response = await fetch(
          `/api/statistics/infoStat?statID=${statID}`
        );
        if (!response.ok) throw new Error("Error al obtener las estadísticas");
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        // Manejo de errores
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    fetchStatInfo();
  }, [statID]);

  return (
    <>
      {info ? (
        <div className="container text-center p-3 mt-5 aparecer">
          <h1 className="">
            Informacion de la estadistica <i>{info.nombreEstadistica}</i>
          </h1>
          <h2>Hora: {info.hora}</h2>
          <h2>Fecha: {info.fecha}</h2>
          <div className=" d-flex flex-column aparecer">
            <div className="card m-3 border border-primary ">
              <div className="row g-0">
                <div className="col-md-4">
                  <Doughnut
                    key={info.id_stat}
                    data={{
                      labels: ["Encestados", "Fallados"],
                      datasets: [
                        {
                          label: "Distribución de Lanzamientos",
                          data: [
                            info.cant_tresPuntosEncestados,

                            info.cant_tresPuntos -
                              info.cant_tresPuntosEncestados,
                          ],
                          backgroundColor: ["#36A2EB", "#FF6384"],
                        },
                      ],
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body border-start h-100 d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">Lanzamientos de 3 Puntos</h5>
                    <p className="card-text">
                      Tiros Lanzados : {info.cant_tresPuntos}
                    </p>
                    <p className="card-text">
                      Tiros Encestados : {info.cant_tresPuntosEncestados}
                    </p>
                    <p className="card-text">
                      Porcentaje Total : {info.estadisticasTresPuntos}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 border border-primary">
              <div className="row g-0">
                <div className="col-md-4">
                  <Doughnut
                    key={info.id_stat}
                    data={{
                      labels: ["Encestados", "Fallados"],
                      datasets: [
                        {
                          label: "Distribución de Lanzamientos",
                          data: [
                            info.cant_dosPuntosEncestados,

                            info.cant_dosPuntos - info.cant_dosPuntosEncestados,
                          ],
                          backgroundColor: ["#36A2EB", "#FF6384"],
                        },
                      ],
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body border-start h-100 d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">Lanzamientos de 2 Puntos</h5>
                    <p className="card-text">
                      Tiros Lanzados : {info.cant_dosPuntos}
                    </p>
                    <p className="card-text">
                      Tiros Encestados : {info.cant_dosPuntosEncestados}
                    </p>
                    <p className="card-text">
                      Porcentaje Total : {info.estadisticasDosPuntos}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 border border-primary">
              <div className="row g-0">
                <div className="col-md-4">
                  <Doughnut
                    key={info.id_stat}
                    data={{
                      labels: ["Encestados", "Fallados"],
                      datasets: [
                        {
                          label: "Distribución de Lanzamientos",
                          data: [
                            info.cantLibresEncestados,

                            info.cantLibres - info.cantLibresEncestados,
                          ],
                          backgroundColor: ["#36A2EB", "#FF6384"],
                        },
                      ],
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body border-start h-100 d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">Lanzamientos de Tiros Libres</h5>
                    <p className="card-text">
                      Tiros Lanzados : {info.cantLibres}
                    </p>
                    <p className="card-text">
                      Tiros Encestados : {info.cantLibresEncestados}
                    </p>
                    <p className="card-text">
                      Porcentaje Total : {info.estadisticasLibres}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 border border-primary">
              <div className="row g-0">
                <div className="col-md-4">
                  <Doughnut
                    key={info.id_stat}
                    data={{
                      labels: ["Encestados", "Fallados"],
                      datasets: [
                        {
                          label: "Distribución de Lanzamientos",
                          data: [
                            info.cantLibresEncestados +
                              info.cant_tresPuntosEncestados +
                              info.cant_dosPuntosEncestados,

                            info.cant_tresPuntos +
                              info.cant_dosPuntos +
                              info.cantLibres -
                              (info.cantLibresEncestados +
                                info.cant_tresPuntosEncestados +
                                info.cant_dosPuntosEncestados),
                          ],
                          backgroundColor: ["#36A2EB", "#FF6384"],
                        },
                      ],
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body border-start h-100 d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">
                      Porcentaje Total de Lanzamientos
                    </h5>
                    <p className="card-text">
                      Tiros Lanzados :{" "}
                      {info.cantLibres +
                        info.cant_dosPuntos +
                        info.cant_tresPuntos}
                    </p>
                    <p className="card-text">
                      Tiros Encestados :{" "}
                      {info.cantLibresEncestados +
                        info.cant_dosPuntosEncestados +
                        info.cant_tresPuntosEncestados}
                    </p>
                    <p className="card-text">
                      Porcentaje Total :{" "}
                      {formula(
                        info.cantLibres +
                          info.cant_dosPuntos +
                          info.cant_tresPuntos,
                        info.cantLibresEncestados +
                          info.cant_dosPuntosEncestados +
                          info.cant_tresPuntosEncestados
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center p-3 mt-5 placeholder-glow aparecer">
          <h1 className="">
            Informacion de la estadistica:{" "}
            <span className="placeholder col-2"></span>
          </h1>
          <h2>
            Hora: <span className="placeholder col-1"></span>
          </h2>
          <h2>
            Fecha: <span className="placeholder col-1"></span>
          </h2>
          <div className="border border-primary d-flex flex-column align-items-center rounded-3 aparecer">
            <div className="card m-3 w-75">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                  <span className="">Loading...</span>
                </div>
                <div className="col-md-8">
                  <div className="card-body placeholder-glow border-start h-100">
                    <h5 className="card-title">Lanzamientos de 3 Puntos</h5>
                    <p className="card-text">
                      Tiros Lanzados :{" "}
                      <span className="placeholder col-7"></span>
                    </p>
                    <p className="card-text">
                      Tiros Encestados :{" "}
                      <span className="placeholder col-4"></span>
                    </p>
                    <p className="card-text">
                      Porcentaje Total :{" "}
                      <span className="placeholder col-6"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 w-75">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                  <span className="">Loading...</span>
                </div>
                <div className="col-md-8">
                  <div className="card-body placeholder-glow border-start h-100">
                    <h5 className="card-title">Lanzamientos de 2 Puntos</h5>
                    <p className="card-text">
                      Tiros Lanzados :{" "}
                      <span className="placeholder col-7"></span>
                    </p>
                    <p className="card-text">
                      Tiros Encestados :{" "}
                      <span className="placeholder col-4"></span>
                    </p>
                    <p className="card-text">
                      Porcentaje Total :{" "}
                      <span className="placeholder col-6"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 w-75">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                  <span className="">Loading...</span>
                </div>
                <div className="col-md-8">
                  <div className="card-body placeholder-glow border-start h-100">
                    <h5 className="card-title">Lanzamientos de Tiros Libres</h5>
                    <p className="card-text">
                      Tiros Lanzados :{" "}
                      <span className="placeholder col-7"></span>
                    </p>
                    <p className="card-text">
                      Tiros Encestados :{" "}
                      <span className="placeholder col-4"></span>
                    </p>
                    <p className="card-text">
                      Porcentaje Total :{" "}
                      <span className="placeholder col-6"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card m-3 w-75">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                  <span className="">Loading...</span>
                </div>
                <div className="col-md-8">
                  <div className="card-body placeholder-glow border-start h-100">
                    <h5 className="card-title">
                      Porcentaje Total de Lanzamientos
                    </h5>
                    <p className="card-text">
                      Tiros Lanzados :{" "}
                      <span className="placeholder col-7"></span>
                    </p>
                    <p className="card-text">
                      Tiros Encestados :{" "}
                      <span className="placeholder col-4"></span>
                    </p>
                    <p className="card-text">
                      Porcentaje Total :{" "}
                      <span className="placeholder col-6"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
