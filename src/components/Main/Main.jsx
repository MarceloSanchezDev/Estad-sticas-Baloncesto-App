import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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
export default function Main() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/inicio");
    }
  }, [token, navigate]);

  return (
    <div className="container-fluid text-white vh-100 w-100 d-flex flex-column justify-content-around aparecer user-select-none">
      <nav className="w-100 px-3 d-flex align-items-center justify-content-center justify-content-lg-end">
        <button
          className="btn btn-primary m-2 shadow"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
        <button
          className="btn btn-secondary m-2 shadow"
          onClick={() => navigate("/register")}
        >
          regístrarse
        </button>
      </nav>
      <div className="d-flex user-select-none align-items-start justify-content-center">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="mb-4">
            Bienvenido a Estadisticas de Baloncesto🏀⛹️‍♂️ !
          </h1>
          <p className="lead mb-4">
            Esta aplicación te permite visualizar estadísticas de baloncesto,
            enfocada en tiros de dos y tres puntos. <br />
            ¡Inicia sesión o regístrate para comenzar!
          </p>
        </div>
        <div
          id="idImagen"
          className="col-12 col-md-6 d-flex justify-content-center align-items-center user-select-none"
        >
          <div className="container text-center text-white aparecer imgComponent">
            <h1 className="">Informacion de la estadistica</h1>
            <h2>Hora: 12:00</h2>
            <h2>Fecha: 23/12/2000</h2>
            <div className=" d-flex flex-column aparecer ">
              <div className="card m-3 border border-primary shadow-lg">
                <div className="row g-0">
                  <div className="col-md-4">
                    <Doughnut
                      data={{
                        labels: ["Encestados", "Fallados"],
                        datasets: [
                          {
                            label: "Distribución de Lanzamientos",
                            data: [
                              20,

                              3,
                            ],
                            backgroundColor: ["#36A2EB", "#FF6384"],
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body border-start h-100 d-flex flex-column justify-content-center align-items-center ">
                      <h5 className="card-title  mb-2">
                        Lanzamientos de 3 Puntos
                      </h5>
                      <p className="card-text text-danger">
                        Tiros Lanzados : 23
                      </p>
                      <p className="card-text text-primary">
                        Tiros Encestados : 20
                      </p>
                      <p className={"card-text text-success"}>
                        Porcentaje Total : 90%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
