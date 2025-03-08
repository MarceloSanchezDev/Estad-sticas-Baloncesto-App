import { useState } from "react";
import { useNavigate } from "react-router";

export default function Nav({ token, logout }) {
  const [ball, setBall] = useState({
    perfil: false,
    nuevaEstadistica: false,
    todasLasEstadisticas: false,
    porcentajeTotal: false,
  });
  const navigate = useNavigate();
  function handleNavigate(route) {
    navigate(route);
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  handleNavigate("/profile");
                  setBall({
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
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  handleNavigate("/newStatistic");
                  setBall({
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
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  handleNavigate("/allStatistic");
                  setBall({
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
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  handleNavigate("/allStatisticPercentage");
                  setBall({
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
            <button className="btn btn-danger w-100" onClick={() => logout()}>
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
