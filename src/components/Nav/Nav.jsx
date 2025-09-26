import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const { logout } = useAuth();
  const [ball, setBall] = useState({
    inicio: true,
    perfil: false,
    nuevaEstadistica: false,
    todasLasEstadisticas: false,
    porcentajeTotal: false,
  });
  const navigate = useNavigate();
  function handleNavigate(route) {
    navigate(route);
  }
  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          🏀 Estadísticas
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-1">
              <button
                className={
                  ball.inicio
                    ? "btn btn-dark w-100 btn-disable"
                    : "btn btn-outline-dark w-100"
                }
                onClick={() => {
                  handleNavigate("/inicio");
                  setBall({
                    inicio: true,
                    perfil: false,
                    nuevaEstadistica: false,
                    todasLasEstadisticas: false,
                    porcentajeTotal: false,
                  });
                }}
              >
                {ball.inicio && "🏀 "} Inicio
              </button>
            </li>
            <li className="nav-item m-1">
              <button
                className={
                  ball.perfil
                    ? "btn btn-dark w-100 btn-disable"
                    : "btn btn-outline-dark w-100"
                }
                onClick={() => {
                  handleNavigate("/profile");
                  setBall({
                    inicio: false,
                    perfil: true,
                    nuevaEstadistica: false,
                    todasLasEstadisticas: false,
                    porcentajeTotal: false,
                  });
                }}
              >
                {ball.perfil && "🏀 "} Perfil
              </button>
            </li>
            <li className="nav-item m-1">
              <button
                className={
                  ball.nuevaEstadistica
                    ? "btn btn-dark w-100 btn-disable"
                    : "btn btn-outline-dark w-100"
                }
                onClick={() => {
                  handleNavigate("/newStatistic");
                  setBall({
                    inicio: false,
                    perfil: false,
                    nuevaEstadistica: true,
                    todasLasEstadisticas: false,
                    porcentajeTotal: false,
                  });
                }}
              >
                {ball.nuevaEstadistica && "🏀 "}Nueva Estadística
              </button>
            </li>
            <li className="nav-item m-1">
              <button
                className={
                  ball.todasLasEstadisticas
                    ? "btn btn-dark w-100 btn-disable"
                    : "btn btn-outline-dark w-100"
                }
                onClick={() => {
                  handleNavigate("/allStatistic");
                  setBall({
                    inicio: false,
                    perfil: false,
                    nuevaEstadistica: false,
                    todasLasEstadisticas: true,
                    porcentajeTotal: false,
                  });
                }}
              >
                {ball.todasLasEstadisticas && "🏀 "}Todas Las Estadísticas
              </button>
            </li>
            <li className="nav-item m-1">
              <button
                className={
                  ball.porcentajeTotal
                    ? "btn btn-dark w-100 btn-disable"
                    : "btn btn-outline-dark w-100"
                }
                onClick={() => {
                  handleNavigate("/allStatisticPercentage");
                  setBall({
                    inicio: false,
                    perfil: false,
                    nuevaEstadistica: false,
                    todasLasEstadisticas: false,
                    porcentajeTotal: true,
                  });
                }}
              >
                {ball.porcentajeTotal && "🏀 "}Porcentaje Total
              </button>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-danger w-100" onClick={handleLogOut}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
