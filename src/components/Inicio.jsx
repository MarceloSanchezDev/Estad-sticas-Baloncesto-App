import { useEffect, useState } from "react";
import StatInit from "../components/StatInit";
import { useNavigate } from "react-router";
import Loader from "./loaders/Loader";
export default function Inicio({ token, user }) {
  const [info, setInfo] = useState();
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
        console.log(data);
        setInfo(data.response[0]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, [user.username]);
  return (
    <div className="container text-center aparecer d-flex flex-column align-items-center justify-content-center ">
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
        <Loader />
      )}
    </div>
  );
}
