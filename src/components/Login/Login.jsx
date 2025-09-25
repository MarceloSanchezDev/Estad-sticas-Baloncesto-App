import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import Loader from "../loaders/Loader";

export default function Login() {
  const { token, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/inicio");
    }
  }, [token, navigate]);
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        swal.fire({
          title: "Error al Iniciar Sesión",
          text: data.error || "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setLoading(true);
        return;
      }
      swal.fire({
        title: "¡Éxito!",
        text: `Bienvenido ${data.email}!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      const user = data;
      login(data.token, user);
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      swal.fire({
        title: "Error al Iniciar Sesión",
        text: "No se pudo conectar con el servidor. Intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(true);
    }
  };
  const handlerClick = () => {
    setLoading(false);
  };
  return (
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center aparecer">
      <form
        role="form"
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
            required
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-success"
            onClick={handlerClick}
          >
            {loading ? "Ingresar 🏀" : <Loader />}
          </button>
        </div>
      </form>

      <div className="mt-3 ">
        <button className="btn btn-outline-light" onClick={() => navigate("/")}>
          Volver ⛹️‍♂️
        </button>
      </div>
    </div>
  );
}
