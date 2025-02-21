import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlerSubmitLogin = async (e) => {
    e.preventDefault();
    console.log("FrontEnd Login", email, password);
  };
  return (
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center">
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
