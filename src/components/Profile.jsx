import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import unknown from "../assets/unknown.jpg";

export default function Profile({ token, user }) {
  const [trueCategory, setTrueCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [truePosition, setTruePosition] = useState(false);
  const [newPosition, setNewPosition] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const editCategory = () => {
    setTrueCategory(!trueCategory);
  };
  const editPosition = () => {
    setTruePosition(!truePosition);
  };
  const handlePosition = (e) => {
    e.preventDefault();
    fetch("/api/profile/position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ position: newPosition, username: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data.result));
      });
  };
  const handleCategory = (e) => {
    e.preventDefault();
    fetch("/api/profile/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria: newCategory, username: user.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data.result));
      });
  };
  return (
    <div className="container text-center h-100 p-3 mt-5 aparecer">
      <h1>Perfil</h1>
      <div className="row h-100 ">
        <div className="col h-100 p-3 m-2 ">
          <div className="row h-100 d-flex flex-column justify-content-between border-primary border rounded-3">
            <div
              className="h-100 bg-light border rounded shadow-sm p-3"
              style={{ minHeight: "720px" }}
            >
              <img
                className="img-fluid rounded-circle img-thumbnail mx-auto d-block user-select-none imgs"
                style={{ width: "250px" }}
                src={unknown}
                alt="unknown"
              />
              <div className="mt-3">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold text-muted text-start">
                        Nombre
                      </div>
                      <p className="text-start">
                        {user.nombre
                          ? `${user.nombre} ${user.apellido}`
                          : "none"}
                      </p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold text-muted text-start">
                        E-mail
                      </div>
                      <p className="text-start">
                        {user.email ? user.email : "none"}
                      </p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold text-muted text-start">
                        Usuario
                      </div>
                      <p className="text-start">
                        {user.username ? user.username : "none"}
                      </p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto w-100">
                      <div className="fw-bold text-muted text-start">
                        Posicion
                      </div>
                      <div className="d-flex justify-content-between align-items-start">
                        {truePosition ? (
                          <form className="d-flex" onSubmit={handlePosition}>
                            <input
                              type="text"
                              className="form-control me-2"
                              onChange={(e) => setNewPosition(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="btn btn-outline-success"
                            >
                              Editar
                            </button>
                          </form>
                        ) : (
                          <p className="text-start">
                            {user.posicion ? user.posicion : "none"}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-light"
                      onClick={() => editPosition()}
                    >
                      {truePosition ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      )}
                    </button>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto w-100">
                      <div className="fw-bold text-muted text-start">
                        Categoria
                      </div>
                      <div className="d-flex justify-content-between align-items-start">
                        {trueCategory ? (
                          <form className="d-flex" onSubmit={handleCategory}>
                            <input
                              type="text"
                              className="form-control me-2"
                              onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="btn btn-outline-success"
                            >
                              Editar
                            </button>
                          </form>
                        ) : (
                          <p className="text-start">
                            {user.categoria ? user.categoria : "none"}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-light"
                      onClick={() => editCategory()}
                    >
                      {trueCategory ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*                <div className="col-md-12 col-12 d-flex justify-content-md-end justify-content-end align-items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-instagram m-2 icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-twitter-x m-2 icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-facebook m-2 icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </div> */
