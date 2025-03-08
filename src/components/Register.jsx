import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function Register({ token, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);
  const handlerSubmitRegister = async (e) => {
    e.preventDefault();
    console.log("FrontEnd Login", email, password);
    e.preventDefault();
    console.log("Probando conexión con el backend...");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, name, lastname, password }),
      });

      const data = await response.json();
      const user = data;
      login(data.token, user);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center aparecer ">
      <form
        className="bg-light p-4 rounded needs-validation shadow"
        onSubmit={handlerSubmitRegister}
      >
        <h2 className="mb-4 text-center">Registro 🏀⛹️‍♂️</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="emailRegister">
            Email :
          </label>
          <input
            className="form-control"
            type="email"
            name="emailRegister"
            id="emailRegister"
            placeholder="youremail@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Username :
          </label>
          <input
            className="form-control"
            type="text"
            id="usernameRegister"
            name="usernameRegister"
            placeholder="user1234"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Name :
          </label>
          <input
            className="form-control"
            type="text"
            id="nameRegister"
            name="usernameRegister"
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Last Name :
          </label>
          <input
            className="form-control"
            type="text"
            id="lastNameRegister"
            name="usernameRegister"
            placeholder="your last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="passwordRegister">
            Password:{" "}
          </label>
          <input
            className="form-control"
            type="password"
            id="passwordRegister"
            name="passwordRegister"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Registrarse 🏀
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver ⛹️‍♂️
        </button>
      </div>
    </div>
  );
}
