import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
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
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export default function newStatistic() {
  const { token, user } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  //Fecha y Hora
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const día = String(fecha.getDate()).padStart(2, "0");

  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");

  const fechaFormateada = `${año}-${mes}-${día}`;
  const horaFormateada = `${horas}:${minutos}:${segundos}`;
  //Estadisticas Completas
  const [statistic, setStatistic] = useState({
    titulo: "",
    lanzamientos3: 0,
    encestados3: 0,
    lanzamientos2: 0,
    encestados2: 0,
    libresLanzados: 0,
    libresEncestados: 0,
    fecha: fechaFormateada,
    hora: horaFormateada,
  });

  //Estadisticas divididas en Graficos
  const [chartData, setChartData] = useState(null);
  const [chartDataPie3, setChartDataPie3] = useState(null);
  const [chartDataDona3, setChartDataDona3] = useState(null);
  const [chartDataPie2, setChartDataPie2] = useState(null);
  const [chartDataDona2, setChartDataDona2] = useState(null);
  const [chartDataPieL, setChartDataPieL] = useState(null);
  const [chartDataDonaL, setChartDataDonaL] = useState(null);
  // handlerVeiw
  const [veiw, setVeiw] = useState(true);
  //Funcion para crear nueva estadistica
  const handlerNewStatistic = async (e) => {
    e.preventDefault();
    /*
    if (!isDisabled) {
      if (statistic.lanzamientos3 >= statistic.encestados3) {
        setIsDisabled(true);
        return;
      }
      if (statistic.lanzamientos2 >= statistic.encestados2) {
        setIsDisabled(true);
        return;
      }
      if (statistic.libresLanzados >= statistic.libresEncestados) {
        setIsDisabled(true);
        return;
      }
    }
*/
    try {
      setStatistic({
        ...statistic,
        fecha: fechaFormateada,
        hora: horaFormateada,
      });
      const response = await fetch("/api/statistics/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statistic, username: user.username }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error desconocido");
      }
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Estadistica Creada Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error al enviar estadísticas:", error.message);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Error al crear Estadistica",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setChartDataDonaL({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.libresEncestados, statistic.libresLanzados],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartDataPieL({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.libresEncestados, statistic.libresLanzados],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartDataDona2({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.encestados2, statistic.lanzamientos2],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartDataPie2({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.encestados2, statistic.lanzamientos2],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartDataDona3({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.encestados3, statistic.lanzamientos3],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartDataPie3({
      labels: ["Encestados", "Fallados"],
      datasets: [
        {
          label: "Distribución de Lanzamientos",
          data: [statistic.encestados3, statistic.lanzamientos3],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });
    setChartData({
      labels: ["Tiros de 3", "Tiros de 2", "Libres"],
      datasets: [
        {
          label: "Encestados",
          data: [
            Number(statistic.encestados3),
            Number(statistic.encestados2),
            Number(statistic.libresEncestados),
          ],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCD56"],
        },
        {
          label: "Intentados",
          data: [
            Number(statistic.lanzamientos3),
            Number(statistic.lanzamientos2),
            Number(statistic.libresLanzados),
          ],
          backgroundColor: ["#9BD0F5", "#FFB1C1", "#FFE082"],
        },
      ],
    });
    setVeiw(false);
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div className="container text-center aparecer h-100">
      <div className="d-flex align-items-center justify-content-center">
        {veiw && (
          <div className="bg-light d-flex justify-content-center align-items-center flex-column p-3 m-2 border-primary border rounded-3 shadow-lg">
            <form onSubmit={handlerNewStatistic}>
              <div className="row">
                <div className="mb-3 col-16">
                  <label htmlFor="nombreEstadistica" className="form-label">
                    Nombre de la Estadistica :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreEstadistica"
                    placeholder="Nombre de la Estadistica"
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        titulo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="input3Lanzados" className="form-label">
                    Cantidad de lanzamientos de 3 lanzados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="input3Lanzados"
                    placeholder="0"
                    onChange={(e) =>
                      setStatistic({
                        ...statistic,
                        lanzamientos3: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="input3Encestados" className="form-label">
                    Cantidad de lanzamientos de 3 encestados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="input3Encestados"
                    placeholder="0"
                    onChange={(e) => {
                      setStatistic({
                        ...statistic,
                        encestados3: Number(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="input2Lanzados" className="form-label">
                    Cantidad de lanzamientos de 2 lanzados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="input2Lanzados"
                    placeholder="0"
                    onChange={(e) => {
                      setStatistic({
                        ...statistic,
                        lanzamientos2: Number(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="input2Encestados" className="form-label">
                    Cantidad de lanzamientos de 2 encestados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="input2Encestados"
                    placeholder="0"
                    onChange={(e) => {
                      setStatistic({
                        ...statistic,
                        encestados2: Number(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="inputLibresLanzados" className="form-label">
                    Cantidad de lanzamientos libres lanzados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputLibresLanzados"
                    placeholder="0"
                    onChange={(e) => {
                      setStatistic({
                        ...statistic,
                        libresLanzados: Number(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3 col-md-16 col-lg-6">
                  <label htmlFor="inputLibresEncestados" className="form-label">
                    Cantidad de lanzamientos libres encestados :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputLibresEncestados"
                    placeholder="0"
                    onChange={(e) => {
                      setStatistic({
                        ...statistic,
                        libresEncestados: Number(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <button className="btn btn-success btn-lg" disabled={isDisabled}>
                {!isDisabled ? (
                  "Crear Nueva Estadistica"
                ) : (
                  <div className="spinner-border p-2" role="status"></div>
                )}
              </button>
            </form>
          </div>
        )}
        {chartData && (
          <div className="mt-5 border border-primary rounded p-3 aparecer">
            <h2>
              Resumen de "
              <i className="text-muted text-decoration-underline">
                {statistic.titulo}
              </i>
              "
            </h2>
            <Bar key={JSON.stringify(chartData)} data={chartData} />
            <p>
              {fechaFormateada} {horaFormateada}
            </p>
            <div className="row d-flex justify-content-center mt-3">
              <h2>Tiros de 3 puntos</h2>
              <div className="col-6">
                <Pie
                  key={JSON.stringify(chartDataPie3)}
                  data={chartDataPie3}
                  options={options}
                />
              </div>
              <div className="col-6">
                <Doughnut
                  key={JSON.stringify(chartDataDona3)}
                  data={chartDataDona3}
                  options={options}
                />
              </div>
              <p>
                {fechaFormateada} {horaFormateada}
              </p>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <h2>Tiros de 2 puntos</h2>
              <div className="col-6">
                <Pie
                  key={JSON.stringify(chartDataPie2)}
                  data={chartDataPie2}
                  options={options}
                />
              </div>
              <div className="col-6">
                <Doughnut
                  key={JSON.stringify(chartDataDona2)}
                  data={chartDataDona2}
                  options={options}
                />
              </div>
              <p>
                {fechaFormateada} {horaFormateada}
              </p>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <h2>Tiros Libres</h2>
              <div className="col-6">
                <Pie
                  key={JSON.stringify(chartDataPieL)}
                  data={chartDataPieL}
                  options={options}
                />
              </div>
              <div className="col-6">
                <Doughnut
                  key={JSON.stringify(chartDataDonaL)}
                  data={chartDataDonaL}
                  options={options}
                />
              </div>
              <p>
                {fechaFormateada} {horaFormateada}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
