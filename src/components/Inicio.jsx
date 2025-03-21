import { useEffect, useState } from "react";
import StatInit from "../components/StatInit";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Inicio() {
  const { token, user } = useAuth();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(`/api/statistics/allInfo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await result.json();
        setInfo(data.response[0]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center text-white aparecer d-flex flex-column align-items-center justify-content-center ">
      {info ? (
        <div
          className="row rounded-3 d-flex align-items-start justify-content-between"
          style={{ minHeight: "100vh", width: "100%" }}
        >
          <StatInit
            titulo={"Lanzamientos totales de 3 puntos"}
            info={[
              info.tresTitosEncestadosTotales,
              info.tresTirosLanzadosTotales,
            ]}
          />
          <StatInit
            titulo={"Lanzamientos totales de 2 puntos"}
            info={[
              info.dosPuntosEncestadosTotales,
              info.dosPuntosLanzadosTotales,
            ]}
          />
          <StatInit
            titulo={"Lanzamientos totales de Libres"}
            info={[info.LibresEncestadosTotales, info.libresLanzadosTotales]}
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
