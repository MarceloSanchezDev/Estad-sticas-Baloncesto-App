import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login({ token ,login}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();
    console.log("FrontEnd Login", email, password);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);
      login(data.token);
      alert("Respuesta del backend: " + JSON.stringify(data));
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center aparecer">
      <form
        className="bg-light p-4 rounded needs-validation shadow"
        onSubmit={handlerSubmitLogin}
        noValidate
      >
        <h2 className="mb-4 text-center">Iniciar Sesión 🏀⛹️‍♂️</h2>

        <div className="mb-3">
          <label htmlFor="emailLogin" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            id="emailLogin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="@gmail.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordLogin" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="contraseña"
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Ingresar 🏀
          </button>
        </div>
      </form>

      <div className="mt-3 ">
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          Volver ⛹️‍♂️
        </button>
      </div>
    </div>
  );
}
