import { useState } from "react";
import StatInit from "../components/StatInit";
export default function Inicio({ token, user }) {
  const [info, setInfo] = useState();
  return (
    <div className="container text-center aparecer d-flex flex-column align-items-center justify-content-center ">
      <h1 className="mt-1">Inicio</h1>
      <div
        className="row rounded-3 d-flex align-items-center justify-content-between"
        style={{ height: "750px", width: "100%" }}
      >
        <StatInit titulo={"Lanzamientos totales de 3 puntos"} info={info} />
        <StatInit titulo={"Lanzamientos totales de 2 puntos"} info={info} />
        <StatInit titulo={"Lanzamientos totales de Libres"} info={info} />
      </div>
    </div>
  );
}
