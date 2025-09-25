import { useNavigate } from "react-router";
import grafico from "../../assets/grafico-de-barras.png";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
export default function Main() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/inicio");
    }
  }, [token, navigate]);

  return (
    <div className="container text-white vh-100 w-100 d-flex flex-column justify-content-around aparecer user-select-none">
      <nav className="w-100 d-flex align-items-center justify-content-center justify-content-lg-end">
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
      <div className="d-flex user-select-none align-items-center justify-content-center">
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
          <img
            alt="App Estadisticas de Baloncesto"
            src={grafico}
            className="imgComponent aparecer"
          />
        </div>
      </div>
    </div>
  );
}
