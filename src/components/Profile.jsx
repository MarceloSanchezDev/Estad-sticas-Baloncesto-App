import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import unknown from "../assets/unknown.jpg";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token, user, updateUser } = useAuth();

  const [trueCategory, setTrueCategory] = useState(false);
  const [truePosition, setTruePosition] = useState(false);
  const [newCategory, setNewCategory] = useState("");
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
        updateUser(data.result);
        editPosition();
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
        updateUser(data.result);
        editCategory();
      });
  };

  return (
    <div className="container text-center h-100 aparecer">
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
