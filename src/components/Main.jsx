import { useNavigate } from "react-router";
import grafico from "../assets/grafico-de-barras.png";
import { useEffect } from "react";
export default function Main({ token }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);
  return (
    <div className="main-container vh-100 d-flex m-3 aparecer user-select-none">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="mb-4">Bienvenido a Estadisticas de Baloncesto🏀⛹️‍♂️ !</h1>
        <p className="lead mb-4">
          Esta aplicación te permite visualizar estadísticas de baloncesto,
          enfocada en tiros de dos y tres puntos. <br />
          ¡Inicia sesión o regístrate para comenzar!
        </p>
        <div>
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
        </div>
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
  );
}
