import { useEffect } from "react";
import StatInit from "../components/StatInit";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useStatistics } from "../context/StatisticContext";
export default function Inicio() {
  const { token } = useAuth();
  const [stats] = useStatistics();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="container text-center text-white aparecer d-flex flex-column align-items-center justify-content-center ">
      {stats ? (
        <div
          className="row rounded-3 d-flex align-items-start justify-content-between"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <StatInit
            titulo={"Lanzamientos totales de 3 puntos"}
            info={[
              stats.tresTitosEncestadosTotales,
              stats.tresTirosLanzadosTotales,
            ]}
          />
          <StatInit
            titulo={"Lanzamientos totales de 2 puntos"}
            info={[
              stats.dosPuntosEncestadosTotales,
              stats.dosPuntosLanzadosTotales,
            ]}
          />
          <StatInit
            titulo={"Lanzamientos totales de Libres"}
            info={[stats.LibresEncestadosTotales, stats.libresLanzadosTotales]}
          />
        </div>
      ) : (
        <div className="container d-flex flex-column align-items-center justify-content-center h-100 vh-100">
          <div className="spinner-border text-light" role="status"></div>
          <span className="text-light">Cargando...</span>
        </div>
      )}
    </div>
  );
}
