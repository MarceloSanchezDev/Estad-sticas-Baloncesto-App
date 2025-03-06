import { useState } from "react";

export default function AllStatisticPercentage({ token }) {
  const [statistic, setStatistic] = useState({
    lanzamientos3: 0,
    encestados3: 0,
    lanzamientos2: 0,
    encestados2: 0,
    libresLanzados: 0,
    libresEncestados: 0,
  });
  const handlerNewStatistic = (e) => {
    e.preventDefault();
    console.log("Nueva Estadistica", statistic);
    console.log(
      "Estadisticas de 3:",
      formula(statistic.lanzamientos3, statistic.encestados3)
    );
    console.log(
      "Estadisticas de 2:",
      formula(statistic.lanzamientos2, statistic.encestados2)
    );
    console.log(
      "Estadisticas de Libres:",
      formula(statistic.libresLanzados, statistic.libresEncestados)
    );
  };
  const formula = (lanzados, encestados) => {
    return (encestados / lanzados) * 100 + "%";
  };

  return (
    <div className="container text-center p-3 mt-5">
      <h1>Nueva Estadistica</h1>
      <div className="bg-light d-flex justify-content-center flex-column p-3">
        <form onSubmit={handlerNewStatistic}>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="input3Lanzados" className="form-label">
                Cantidad de lanzamientos de 3 lanzados :
              </label>
              <input
                type="text"
                className="form-control"
                id="input3Lanzados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({ ...statistic, lanzamientos3: e.target.value })
                }
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="input3Encestados" className="form-label">
                Cantidad de lanzamientos de 3 encestados :
              </label>
              <input
                type="text"
                className="form-control"
                id="input3Encestados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({ ...statistic, encestados3: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="input2Lanzados" className="form-label">
                Cantidad de lanzamientos de 2 lanzados :
              </label>
              <input
                type="text"
                className="form-control"
                id="input2Lanzados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({ ...statistic, lanzamientos2: e.target.value })
                }
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="input2Encestados" className="form-label">
                Cantidad de lanzamientos de 2 encestados :
              </label>
              <input
                type="text"
                className="form-control"
                id="input2Encestados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({ ...statistic, encestados2: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="inputLibresLanzados" className="form-label">
                Cantidad de lanzamientos libres lanzados :
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLibresLanzados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({ ...statistic, libresLanzados: e.target.value })
                }
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="inputLibresEncestados" className="form-label">
                Cantidad de lanzamientos libres encestados :
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLibresEncestados"
                placeholder="50"
                onChange={(e) =>
                  setStatistic({
                    ...statistic,
                    libresEncestados: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button className="btn btn-outline-dark btn-lg">
            Crear Nueva Estadistica
          </button>
        </form>
      </div>
    </div>
  );
}
